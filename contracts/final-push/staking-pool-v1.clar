;; staking-pool-v1.clar
;; Simple staking mechanism

(define-map stakes principal uint)
(define-data-var total-staked uint u0)

(define-public (stake (amount uint))
    (let ((current-stake (default-to u0 (map-get? stakes tx-sender))))
        (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
        (map-set stakes tx-sender (+ current-stake amount))
        (var-set total-staked (+ (var-get total-staked) amount))
        (ok true)
    )
)

(define-public (unstake (amount uint))
    (let ((current-stake (default-to u0 (map-get? stakes tx-sender))))
        (asserts! (>= current-stake amount) (err u401))
        (try! (as-contract (stx-transfer? amount tx-sender tx-sender)))
        (map-set stakes tx-sender (- current-stake amount))
        (var-set total-staked (- (var-get total-staked) amount))
        (ok true)
    )
)

(define-read-only (get-stake (user principal))
    (default-to u0 (map-get? stakes user))
)
