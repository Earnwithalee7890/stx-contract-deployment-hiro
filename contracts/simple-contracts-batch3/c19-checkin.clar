
;; Contract 19: Check-In
(define-map check-ins principal uint)

(define-public (check-in)
    (let ((count (default-to u0 (map-get? check-ins tx-sender))))
        (ok (map-set check-ins tx-sender (+ count u1)))
    )
)
