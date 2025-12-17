;; title: Weekly Rewards Pool
;; version: 1.0.0
;; summary: Weekly reward distribution system
;; description: Users contribute, top contributors get weekly rewards

(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-week-not-ended (err u101))
(define-constant err-already-claimed (err u102))

(define-constant contribution-fee u75000) ;; 0.075 STX
(define-constant blocks-per-week u1008) ;; ~7 days

(define-data-var current-week uint u0)
(define-data-var reward-pool uint u0)

(define-map week-contributions {week: uint, user: principal} uint)
(define-map week-claims {week: uint, user: principal} bool)
(define-map week-totals uint uint)

(define-public (contribute)
  (let
    (
      (caller tx-sender)
      (week (/ stacks-block-height blocks-per-week))
      (current-contribution (default-to u0 (map-get? week-contributions {week: week, user: caller})))
    )
    ;; Collect contribution
    (try! (stx-transfer? contribution-fee caller (as-contract tx-sender)))
    
    ;; Update contributions
    (map-set week-contributions {week: week, user: caller} (+ current-contribution contribution-fee))
    (map-set week-totals week (+ (default-to u0 (map-get? week-totals week)) contribution-fee))
    (var-set reward-pool (+ (var-get reward-pool) contribution-fee))
    
    (print {event: "weekly-contribution", user: caller, week: week, amount: contribution-fee})
    (ok true)
  )
)

(define-public (claim-weekly-reward (week uint) (reward-amount uint))
  (let ((caller tx-sender))
    (asserts! (< week (/ stacks-block-height blocks-per-week)) err-week-not-ended)
    (asserts! (is-none (map-get? week-claims {week: week, user: caller})) err-already-claimed)
    
    ;; Mark as claimed
    (map-set week-claims {week: week, user: caller} true)
    
    ;; Transfer reward
    (try! (as-contract (stx-transfer? reward-amount tx-sender caller)))
    (var-set reward-pool (- (var-get reward-pool) reward-amount))
    
    (print {event: "reward-claimed", user: caller, week: week, amount: reward-amount})
    (ok true)
  )
)

(define-read-only (get-user-contribution (week uint) (user principal))
  (ok (default-to u0 (map-get? week-contributions {week: week, user: user})))
)

(define-read-only (get-week-total (week uint))
  (ok (default-to u0 (map-get? week-totals week)))
)

(define-read-only (get-current-week)
  (ok (/ stacks-block-height blocks-per-week))
)
