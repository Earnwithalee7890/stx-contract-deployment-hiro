;; Simple Vote for 30-contract batch
(define-map votes principal bool)

(define-public (vote (choice bool))
    (begin
        (map-set votes tx-sender choice)
        (ok true)))
