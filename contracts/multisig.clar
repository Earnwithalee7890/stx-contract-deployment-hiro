;; Multisig Wallet Contract
;; Simple multisig wallet requiring 2 of 3 approvals

(define-constant owner-1 tx-sender)
(define-data-var owner-2 principal tx-sender)
(define-data-var owner-3 principal tx-sender)

(define-map pending-transactions uint {
  to: principal,
  amount: uint,
  approvals: uint,
  executed: bool
})
(define-map has-approved {tx-id: uint, owner: principal} bool)
(define-data-var tx-nonce uint u0)

(define-public (propose-transaction (to principal) (amount uint))
  (let ((tx-id (+ (var-get tx-nonce) u1)))
    (map-set pending-transactions tx-id {
      to: to,
      amount: amount,
      approvals: u1,
      executed: false
    })
    (map-set has-approved {tx-id: tx-id, owner: tx-sender} true)
    (var-set tx-nonce tx-id)
    (ok tx-id)
  )
)

(define-public (approve-transaction (tx-id uint))
  (match (map-get? pending-transactions tx-id)
    tx-data (begin
      (asserts! (is-none (map-get? has-approved {tx-id: tx-id, owner: tx-sender})) (err u100))
      (map-set has-approved {tx-id: tx-id, owner: tx-sender} true)
      (let ((new-approvals (+ (get approvals tx-data) u1)))
        (map-set pending-transactions tx-id (merge tx-data {approvals: new-approvals}))
        (if (>= new-approvals u2)
          (execute-transaction tx-id)
          (ok true)
        )
      )
    )
    (err u101)
  )
)

(define-private (execute-transaction (tx-id uint))
  (match (map-get? pending-transactions tx-id)
    tx-data (begin
      (try! (as-contract (stx-transfer? (get amount tx-data) tx-sender (get to tx-data))))
      (map-set pending-transactions tx-id (merge tx-data {executed: true}))
      (ok true)
    )
    (err u102)
  )
)

(define-read-only (get-transaction (tx-id uint))
  (ok (map-get? pending-transactions tx-id))
)
