;; contract-upgrader.clar
(define-map versions (string-ascii 20) principal)
(define-public (upgrade (name (string-ascii 20)) (new-p principal))
    (begin
        (map-set versions name new-p)
        (ok true)))
