;; oracle-price-feed.clar
;; Mock oracle

(define-data-var btc-price uint u100000)

(define-public (update-price (new-price uint))
    (begin
        ;; Only oracle owner check
        (var-set btc-price new-price)
        (ok true)
    )
)

(define-read-only (read-price)
    (var-get btc-price)
)
