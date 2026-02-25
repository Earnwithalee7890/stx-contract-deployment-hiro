;; Simple Marketplace for 30-contract batch
(define-map listings uint { seller: principal, price: uint })
(define-data-var list-id uint u0)

(define-public (list-item (price uint))
    (let ((id (+ (var-get list-id) u1)))
        (map-set listings id { seller: tx-sender, price: price })
        (var-set list-id id)
        (ok id)))
