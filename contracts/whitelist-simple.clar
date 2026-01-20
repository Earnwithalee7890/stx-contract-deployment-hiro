;; title: whitelist-simple
;; summary: Simple whitelist management for early access builders.

(define-map whitelist principal bool)

(define-public (add-to-whitelist (user principal))
    (begin
        (map-set whitelist user true)
        (ok true)
    )
)

(define-read-only (is-whitelisted (user principal))
    (default-to false (map-get? whitelist user))
)
