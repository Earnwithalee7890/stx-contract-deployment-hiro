;; Simple Escrow for 30-contract batch
(define-map escrows uint { buyer: principal, seller: principal, amount: uint, status: (string-ascii 10) })
(define-data-var escrow-id uint u0)

(define-public (create-escrow (seller principal) (amount uint))
    (let ((id (+ (var-get escrow-id) u1)))
        (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
        (map-set escrows id { buyer: tx-sender, seller: seller, amount: amount, status: "pending" })
        (var-set escrow-id id)
        (ok id)))
