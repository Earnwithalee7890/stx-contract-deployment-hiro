;; title: Simple Point Accumulator
;; version: 1.0.0
;; summary: Accumulate points through small transactions
;; description: Users earn points for each transaction, redeemable for rewards

(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-insufficient-points (err u101))

(define-constant points-per-action u10)
(define-constant action-fee u25000) ;; 0.025 STX
(define-constant points-to-stx-ratio u100) ;; 100 points = 0.01 STX

(define-data-var total-points-issued uint u0)
(define-data-var reward-pool uint u1500000) ;; 1.5 STX pool

(define-map user-points principal uint)
(define-map user-actions principal uint)

(define-public (perform-action)
  (let ((caller tx-sender))
    ;; Collect fee
    (try! (stx-transfer? action-fee caller (as-contract tx-sender)))
    
    ;; Award points
    (map-set user-points caller (+ (default-to u0 (map-get? user-points caller)) points-per-action))
    (map-set user-actions caller (+ (default-to u0 (map-get? user-actions caller)) u1))
    (var-set total-points-issued (+ (var-get total-points-issued) points-per-action))
    
    (print {event: "action-performed", user: caller, points-earned: points-per-action})
    (ok points-per-action)
  )
)

(define-public (redeem-points (points uint))
  (let
    (
      (caller tx-sender)
      (user-balance (default-to u0 (map-get? user-points caller)))
      (reward-amount (/ (* points u10000) points-to-stx-ratio))
    )
    (asserts! (>= user-balance points) err-insufficient-points)
    (asserts! (<= reward-amount (var-get reward-pool)) (err u102))
    
    ;; Deduct points
    (map-set user-points caller (- user-balance points))
    
    ;; Transfer reward
    (try! (as-contract (stx-transfer? reward-amount tx-sender caller)))
    (var-set reward-pool (- (var-get reward-pool) reward-amount))
    
    (print {event: "points-redeemed", user: caller, points: points, reward: reward-amount})
    (ok reward-amount)
  )
)

(define-read-only (get-user-points (user principal))
  (ok (default-to u0 (map-get? user-points user)))
)

(define-read-only (get-user-actions (user principal))
  (ok (default-to u0 (map-get? user-actions user)))
)

(define-read-only (get-pool-stats)
  (ok {
    total-points-issued: (var-get total-points-issued),
    reward-pool: (var-get reward-pool)
  })
)
