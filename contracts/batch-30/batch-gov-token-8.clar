;; Simple Gov Token for 30-contract batch
(define-fungible-token gov-token)

(define-public (mint (amount uint) (recipient principal))
    (ft-mint? gov-token amount recipient))

(define-read-only (get-total-supply)
    (ok (ft-get-supply gov-token)))
