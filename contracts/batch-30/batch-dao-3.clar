;; Simple DAO for 30-contract batch
(define-data-var proposal-count uint u0)
(define-map proposals uint { title: (string-ascii 50), votes: uint })

(define-public (create-proposal (title (string-ascii 50)))
    (let ((id (+ (var-get proposal-count) u1)))
        (map-set proposals id { title: title, votes: u0 })
        (var-set proposal-count id)
        (ok id)))

(define-read-only (get-proposal (id uint))
    (map-get? proposals id))
