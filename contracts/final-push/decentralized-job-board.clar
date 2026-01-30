;; decentralized-job-board.clar
;; On-chain job postings

(define-map jobs uint {employer: principal, title: (string-ascii 64), bounty: uint, open: bool})
(define-data-var job-count uint u0)

(define-public (post-job (title (string-ascii 64)) (bounty uint))
    (let ((id (+ (var-get job-count) u1)))
        (try! (stx-transfer? bounty tx-sender (as-contract tx-sender)))
        (map-set jobs id {employer: tx-sender, title: title, bounty: bounty, open: true})
        (var-set job-count id)
        (ok id)
    )
)

(define-public (hire (id uint) (worker principal))
    (let ((job (unwrap! (map-get? jobs id) (err u404))))
        (asserts! (is-eq tx-sender (get employer job)) (err u403))
        (asserts! (get open job) (err u400))
        (try! (as-contract (stx-transfer? (get bounty job) tx-sender worker)))
        (map-set jobs id (merge job {open: false}))
        (ok true)
    )
)
