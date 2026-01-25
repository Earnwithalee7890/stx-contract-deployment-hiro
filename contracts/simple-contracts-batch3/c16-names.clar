
;; Contract 16: Name Registry
(define-map names principal (string-ascii 20))

(define-public (register-name (name (string-ascii 20)))
    (ok (map-set names tx-sender name))
)

(define-read-only (get-name (user principal))
    (ok (map-get? names user))
)
