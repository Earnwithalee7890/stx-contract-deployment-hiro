;; Simple Counter for 30-contract batch
(define-data-var total uint u0)

(define-public (increment)
    (begin
        (var-set total (+ (var-get total) u1))
        (ok (var-get total))))
