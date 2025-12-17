;; title: Transaction Fee Rewards
;; version: 1.0.0
;; summary: Small transaction fees with instant micro-rewards
;; description: Users pay small fees and get instant micro rewards back

(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))

(define-constant transaction-fee u30000) ;; 0.03 STX
(define-constant micro-reward u10000) ;; 0.01 STX instant reward

(define-data-var total-transactions uint u0)
(define-data-var reward-pool uint u3000000) ;; 3 STX pool

(define-map user-transactions principal uint)

(define-public (make-transaction)
  (let ((caller tx-sender))
    (asserts! (>= (var-get reward-pool) micro-reward) (err u101))
    
    ;; Collect fee
    (try! (stx-transfer? transaction-fee caller (as-contract tx-sender)))
    
    ;; Send micro reward
    (try! (as-contract (stx-transfer? micro-reward tx-sender caller)))
    
    ;; Update stats
    (var-set total-transactions (+ (var-get total-transactions) u1))
    (var-set reward-pool (- (var-get reward-pool) micro-reward))
    (map-set user-transactions caller (+ (default-to u0 (map-get? user-transactions caller)) u1))
    
    (print {event: "transaction", user: caller, fee: transaction-fee, reward: micro-reward})
    (ok {fee-paid: transaction-fee, reward-received: micro-reward})
  )
)

(define-read-only (get-user-transactions (user principal))
  (ok (default-to u0 (map-get? user-transactions user)))
)

(define-read-only (get-stats)
  (ok {
    total-transactions: (var-get total-transactions),
    reward-pool: (var-get reward-pool)
  })
)

(define-public (fund-pool (amount uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
    (var-set reward-pool (+ (var-get reward-pool) amount))
    (ok true)
  )
)
