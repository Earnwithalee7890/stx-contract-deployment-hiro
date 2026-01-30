;; multisig-vault.clar
;; 2-of-3 multisig wallet

(define-constant owner-1 tx-sender)
(define-constant owner-2 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5)
(define-constant owner-3 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG)
(define-constant required-votes u2)

(define-map proposals uint {recipient: principal, amount: uint, votes: uint, executed: bool})
(define-map votes {proposal-id: uint, voter: principal} bool)
(define-data-var proposal-count uint u0)

(define-private (is-owner (user principal))
    (or (is-eq user owner-1) (or (is-eq user owner-2) (is-eq user owner-3)))
)

(define-public (propose (recipient principal) (amount uint))
    (begin
        (asserts! (is-owner tx-sender) (err u403))
        (let ((id (+ (var-get proposal-count) u1)))
            (map-set proposals id {recipient: recipient, amount: amount, votes: u0, executed: false})
            (var-set proposal-count id)
            (ok id)
        )
    )
)

(define-public (confirm (id uint))
    (let (
        (proposal (unwrap! (map-get? proposals id) (err u404)))
    )
        (asserts! (is-owner tx-sender) (err u403))
        (asserts! (not (get executed proposal)) (err u400))
        (asserts! (is-none (map-get? votes {proposal-id: id, voter: tx-sender})) (err u401))
        
        (map-set votes {proposal-id: id, voter: tx-sender} true)
        (map-set proposals id (merge proposal {votes: (+ (get votes proposal) u1)}))
        (ok true)
    )
)

(define-public (execute (id uint))
    (let (
        (proposal (unwrap! (map-get? proposals id) (err u404)))
    )
        (asserts! (>= (get votes proposal) required-votes) (err u403))
        (asserts! (not (get executed proposal)) (err u400))
        (try! (as-contract (stx-transfer? (get amount proposal) tx-sender (get recipient proposal))))
        (map-set proposals id (merge proposal {executed: true}))
        (ok true)
    )
)
