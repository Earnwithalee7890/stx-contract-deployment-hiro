;; bridge-fee-collector.clar
(define-data-var total-fees uint u0)
(define-public (collect (amount uint))
    (begin
        (var-set total-fees (+ (var-get total-fees) amount))
        (ok true)))
