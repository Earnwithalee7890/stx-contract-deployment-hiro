;; Simple Registry for 30-contract batch
(define-map records (string-ascii 20) principal)

(define-public (register (name (string-ascii 20)))
    (begin
        (map-set records name tx-sender)
        (ok true)))
