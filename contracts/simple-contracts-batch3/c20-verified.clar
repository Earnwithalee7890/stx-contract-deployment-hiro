
;; Contract 20: Verified User
(define-map verified principal bool)

(define-public (verify-me)
    (ok (map-set verified tx-sender true))
)

(define-read-only (is-verified (user principal))
    (ok (default-to false (map-get? verified user)))
)
