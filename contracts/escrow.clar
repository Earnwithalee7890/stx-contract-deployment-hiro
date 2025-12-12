;; Escrow Contract
;; Hold funds in escrow

(define-constant err-not-authorized (err u100))
(define-constant err-escrow-not-found (err u101))

(define-map escrows uint {
  sender: principal,
  recipient: principal,
  amount: uint,
  released: bool
})
(define-data-var escrow-nonce uint u0)

(define-public (create-escrow (recipient principal) (amount uint))
  (let ((id (+ (var-get escrow-nonce) u1)))
    (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
    (map-set escrows id {
      sender: tx-sender,
      recipient: recipient,
      amount: amount,
      released: false
    })
    (var-set escrow-nonce id)
    (ok id)
  )
)

(define-public (release-escrow (escrow-id uint))
  (match (map-get? escrows escrow-id)
    escrow (begin
      (asserts! (is-eq tx-sender (get sender escrow)) err-not-authorized)
      (asserts! (not (get released escrow)) err-not-authorized)
      (try! (as-contract (stx-transfer? (get amount escrow) tx-sender (get recipient escrow))))
      (map-set escrows escrow-id (merge escrow {released: true}))
      (ok true)
    )
    err-escrow-not-found
  )
)

(define-read-only (get-escrow (id uint))
  (ok (map-get? escrows id))
)
