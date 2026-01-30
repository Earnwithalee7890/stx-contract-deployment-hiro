;; recurring-payments.clar
;; Subscription simulation

(define-map subscriptions principal {provider: principal, amount: uint, last-paid: uint})

(define-public (subscribe (provider principal) (amount uint))
    (begin
        (map-set subscriptions tx-sender {provider: provider, amount: amount, last-paid: block-height})
        (ok true)
    )
)

(define-public (pay-subscription)
    (let ((sub (unwrap! (map-get? subscriptions tx-sender) (err u404))))
        (try! (stx-transfer? (get amount sub) tx-sender (get provider sub)))
        (map-set subscriptions tx-sender (merge sub {last-paid: block-height}))
        (ok true)
    )
)
