;; milestone-escrow.clar
;; Escrow with milestone release

(define-map escrows uint {payer: principal, payee: principal, amount: uint, released: bool})
(define-data-var escrow-count uint u0)

(define-public (create-escrow (payee principal) (amount uint))
    (let ((id (+ (var-get escrow-count) u1)))
        (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
        (map-set escrows id {payer: tx-sender, payee: payee, amount: amount, released: false})
        (var-set escrow-count id)
        (ok id)
    )
)

(define-public (release (id uint))
    (let ((escrow (unwrap! (map-get? escrows id) (err u404))))
        (asserts! (is-eq tx-sender (get payer escrow)) (err u403))
        (asserts! (not (get released escrow)) (err u400))
        (try! (as-contract (stx-transfer? (get amount escrow) tx-sender (get payee escrow))))
        (map-set escrows id (merge escrow {released: true}))
        (ok true)
    )
)
