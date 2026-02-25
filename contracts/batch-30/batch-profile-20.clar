;; Simple Profile for 30-contract batch
(define-map profiles principal { bio: (string-ascii 100), link: (string-ascii 100) })

(define-public (update (bio (string-ascii 100)) (link (string-ascii 100)))
    (begin
        (map-set profiles tx-sender { bio: bio, link: link })
        (ok true)))
