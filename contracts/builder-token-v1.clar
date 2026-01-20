;; title: builder-token-v1
;; summary: Initial implementation for a builder reputation token.

(define-data-var total-supply uint u0)
(define-map balances principal uint)

(define-public (mint (amt uint))
    (begin
        (var-set total-supply (+ (var-get total-supply) amt))
        (map-set balances tx-sender (+ (default-to u0 (map-get? balances tx-sender)) amt))
        (ok amt)
    )
)

(define-read-only (get-balance (user principal))
    (default-to u0 (map-get? balances user))
)
