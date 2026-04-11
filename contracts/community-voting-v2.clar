;; Community Voting V2
;; Voting with weight based on reputation score.

(define-map proposals uint { title: (string-ascii 128), votes: uint, active: bool })
(define-data-var proposal-count uint u0)

(define-public (create-proposal (title (string-ascii 128)))
  (let ((id (+ (var-get proposal-count) u1)))
    (map-set proposals id { title: title, votes: u0, active: true })
    (var-set proposal-count id)
    (ok id)
  )
)

(define-public (vote-on-proposal (proposal-id uint) (weight uint))
  (begin
    (asserts! (default-to false (get active (map-get? proposals proposal-id))) (err u404))
    (let ((current-votes (get votes (unwrap-panic (map-get? proposals proposal-id)))))
        (map-set proposals proposal-id (merge (unwrap-panic (map-get? proposals proposal-id)) { votes: (+ current-votes weight) }))
        (ok true)
    )
  )
)
