;; Simple Vault for 30-contract batch
(define-map deposits principal uint)

(define-public (deposit (amount uint))
    (begin
        (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
        (map-set deposits tx-sender (+ (default-to u0 (map-get? deposits tx-sender)) amount))
        (ok true)))

(define-read-only (get-balance (user principal))
    (default-to u0 (map-get? deposits user)))
