;; Voting Contract
;; Create and vote on proposals

(define-constant err-already-voted (err u100))

(define-map proposals uint {title: (string-ascii 64), votes-for: uint, votes-against: uint})
(define-map has-voted {proposal-id: uint, voter: principal} bool)
(define-data-var proposal-count uint u0)

(define-public (create-proposal (title (string-ascii 64)))
  (let ((id (var-get proposal-count)))
    (map-set proposals id {title: title, votes-for: u0, votes-against: u0})
    (var-set proposal-count (+ id u1))
    (ok id)
  )
)

(define-public (vote (proposal-id uint) (vote-for bool))
  (let ((voter tx-sender))
    (asserts! (is-none (map-get? has-voted {proposal-id: proposal-id, voter: voter})) err-already-voted)
    (map-set has-voted {proposal-id: proposal-id, voter: voter} true)
    (match (map-get? proposals proposal-id)
      proposal (if vote-for
        (map-set proposals proposal-id (merge proposal {votes-for: (+ (get votes-for proposal) u1)}))
        (map-set proposals proposal-id (merge proposal {votes-against: (+ (get votes-against proposal) u1)}))
      )
      false
    )
    (ok true)
  )
)

(define-read-only (get-proposal (id uint))
  (ok (map-get? proposals id))
)
