;; dao-ballot-v3.clar
(define-map votes uint uint)
(define-public (cast-vote (id uint) (v uint))
    (begin
        (map-set votes id (+ (default-to u0 (map-get? votes id)) v))
        (ok true)))
