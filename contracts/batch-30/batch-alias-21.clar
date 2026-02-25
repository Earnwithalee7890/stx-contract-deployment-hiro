;; Simple Alias for 30-contract batch
(define-map aliases principal (string-ascii 10))

(define-public (set-alias (name (string-ascii 10)))
    (begin
        (map-set aliases tx-sender name)
        (ok true)))
