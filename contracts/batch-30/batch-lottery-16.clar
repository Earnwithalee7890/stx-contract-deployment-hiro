;; Simple Lottery for 30-contract batch
(define-map participants uint principal)
(define-data-var count uint u0)

(define-public (enter)
    (let ((id (+ (var-get count) u1)))
        (map-set participants id tx-sender)
        (var-set count id)
        (ok id)))
