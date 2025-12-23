;; Advanced Staking Rewards System
;; Users stake STX and earn rewards over time with flexible lock periods

(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_NOT_AUTHORIZED (err u401))
(define-constant ERR_NO_STAKE (err u402))
(define-constant ERR_ALREADY_STAKED (err u403))
(define-constant ERR_LOCK_NOT_EXPIRED (err u404))
(define-constant ERR_INSUFFICIENT_REWARDS (err u405))

(define-constant REWARD_RATE u100) ;; 1% per 144 blocks (~24 hours)
(define-constant MIN_STAKE u1000000) ;; 1 STX minimum

(define-data-var total-staked uint u0)
(define-data-var reward-pool uint u0)

(define-map stakes
    principal
    {
        amount: uint,
        staked-at: uint,
        lock-period: uint, ;; in blocks
        last-claim: uint
    }
)

(define-public (stake (amount uint) (lock-period uint))
    (let
        (
            (existing-stake (map-get? stakes tx-sender))
        )
        (asserts! (>= amount MIN_STAKE) ERR_NOT_AUTHORIZED)
        (asserts! (is-none existing-stake) ERR_ALREADY_STAKED)
        
        (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
        
        (map-set stakes tx-sender {
            amount: amount,
            staked-at: block-height,
            lock-period: lock-period,
            last-claim: block-height
        })
        
        (var-set total-staked (+ (var-get total-staked) amount))
        (ok true)
    )
)

(define-public (calculate-rewards (user principal))
    (let
        (
            (stake-info (unwrap! (map-get? stakes user) ERR_NO_STAKE))
            (blocks-staked (- block-height (get last-claim stake-info)))
            (base-reward (/ (* (get amount stake-info) REWARD_RATE) u10000))
            (time-reward (/ (* base-reward blocks-staked) u144))
            ;; Bonus for longer lock periods
            (lock-bonus (if (>= (get lock-period stake-info) u1008)
                (/ time-reward u10) ;; 10% bonus for 7-day lock
                u0
            ))
        )
        (ok (+ time-reward lock-bonus))
    )
)

(define-public (claim-rewards)
    (let
        (
            (stake-info (unwrap! (map-get? stakes tx-sender) ERR_NO_STAKE))
            (rewards (unwrap! (calculate-rewards tx-sender) ERR_NO_STAKE))
        )
        (asserts! (<= rewards (var-get reward-pool)) ERR_INSUFFICIENT_REWARDS)
        
        (try! (as-contract (stx-transfer? rewards tx-sender tx-sender)))
        
        (map-set stakes tx-sender (merge stake-info {last-claim: block-height}))
        (var-set reward-pool (- (var-get reward-pool) rewards))
        (ok rewards)
    )
)

(define-public (unstake)
    (let
        (
            (stake-info (unwrap! (map-get? stakes tx-sender) ERR_NO_STAKE))
            (unlock-height (+ (get staked-at stake-info) (get lock-period stake-info)))
        )
        (asserts! (>= block-height unlock-height) ERR_LOCK_NOT_EXPIRED)
        
        ;; Claim any pending rewards first
        (try! (claim-rewards))
        
        ;; Return staked amount
        (try! (as-contract (stx-transfer? (get amount stake-info) tx-sender tx-sender)))
        
        (map-delete stakes tx-sender)
        (var-set total-staked (- (var-get total-staked) (get amount stake-info)))
        (ok true)
    )
)

(define-public (fund-reward-pool (amount uint))
    (begin
        (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
        (var-set reward-pool (+ (var-get reward-pool) amount))
        (ok true)
    )
)

(define-read-only (get-stake (user principal))
    (ok (map-get? stakes user))
)

(define-read-only (get-total-staked)
    (ok (var-get total-staked))
)
