;; ecosystem-index.clar
(define-map ecosystem-coins (string-ascii 20) principal)
(define-public (register-coin (name (string-ascii 20)) (p principal))
    (begin
        (map-set ecosystem-coins name p)
        (ok true)))
