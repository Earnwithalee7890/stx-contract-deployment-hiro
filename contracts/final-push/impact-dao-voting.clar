;; impact-dao-voting.clar
;; Simple voting mechanism for impact proposals

(define-data-var proposal-count uint u0)
(define-map proposals uint {title: (string-ascii 50), votes-for: uint, votes-against: uint, status: (string-ascii 10)})
(define-map votes {proposal-id: uint, voter: principal} bool)

(define-public (create-proposal (title (string-ascii 50)))
    (let ((proposal-id (+ (var-get proposal-count) u1)))
        (map-set proposals proposal-id {title: title, votes-for: u0, votes-against: u0, status: "active"})
        (var-set proposal-count proposal-id)
        (ok proposal-id)
    )
)

(define-public (vote (proposal-id uint) (vote-for bool))
    (let (
        (proposal (unwrap! (map-get? proposals proposal-id) (err u404)))
        (previous-vote (map-get? votes {proposal-id: proposal-id, voter: tx-sender}))
    )
        (asserts! (is-none previous-vote) (err u403)) ;; Already voted
        (if vote-for
            (map-set proposals proposal-id (merge proposal {votes-for: (+ (get votes-for proposal) u1)}))
            (map-set proposals proposal-id (merge proposal {votes-against: (+ (get votes-against proposal) u1)}))
        )
        (map-set votes {proposal-id: proposal-id, voter: tx-sender} true)
        (ok true)
    )
)

(define-read-only (get-proposal (proposal-id uint))
    (map-get? proposals proposal-id)
)
