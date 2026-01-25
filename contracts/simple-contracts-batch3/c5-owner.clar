
;; Contract 5: Owner Check
(define-constant contract-owner tx-sender)

(define-public (only-owner-action)
    (begin
        (asserts! (is-eq tx-sender contract-owner) (err u100))
        (ok "You are the owner")
    )
)
