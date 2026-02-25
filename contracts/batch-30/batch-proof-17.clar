;; Simple Proof for 30-contract batch
(define-map hashes (buff 32) bool)

(define-public (anchor (h (buff 32)))
    (begin
        (map-set hashes h true)
        (ok true)))
