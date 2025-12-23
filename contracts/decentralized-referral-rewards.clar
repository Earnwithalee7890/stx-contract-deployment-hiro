;; Decentralized Referral & Rewards System
;; Track referrals and reward users for growing the network

(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_NOT_AUTHORIZED (err u401))
(define-constant ERR_ALREADY_REGISTERED (err u402))
(define-constant ERR_SELF_REFERRAL (err u403))
(define-constant ERR_INVALID_REFERRER (err u404))
(define-constant ERR_INSUFFICIENT_REWARDS (err u405))

(define-constant BASE_REWARD u50000) ;; 0.05 STX per referral
(define-constant REFEREE_REWARD u25000) ;; 0.025 STX for joining

(define-data-var total-users uint u0)
(define-data-var reward-pool uint u0)

(define-map users
    principal
    {
        referrer: (optional principal),
        referral-count: uint,
        total-earned: uint,
        joined-at: uint,
        tier: uint
    }
)

(define-map referral-tree
    principal
    (list 100 principal) ;; List of direct referrals
)

(define-public (register (referrer (optional principal)))
    (let
        (
            (existing-user (map-get? users tx-sender))
        )
        (asserts! (is-none existing-user) ERR_ALREADY_REGISTERED)
        (asserts! (not (is-eq (some tx-sender) referrer)) ERR_SELF_REFERRAL)
        
        ;; Validate referrer exists if provided
        (match referrer
            ref-principal
                (asserts! (is-some (map-get? users ref-principal)) ERR_INVALID_REFERRER)
            true
        )
        
        ;; Register new user
        (map-set users tx-sender {
            referrer: referrer,
            referral-count: u0,
            total-earned: u0,
            joined-at: block-height,
            tier: u1
        })
        
        (var-set total-users (+ (var-get total-users) u1))
        
        ;; Reward new user
        (try! (distribute-join-reward tx-sender))
        
        ;; Update referrer stats and reward them
        (match referrer
            ref-principal
                (begin
                    (try! (update-referrer-stats ref-principal tx-sender))
                    (try! (distribute-referral-reward ref-principal))
                    (ok true)
                )
            (ok true)
        )
    )
)

(define-private (update-referrer-stats (referrer principal) (referee principal))
    (let
        (
            (referrer-data (unwrap! (map-get? users referrer) ERR_INVALID_REFERRER))
            (current-refs (default-to (list) (map-get? referral-tree referrer)))
        )
        (map-set users referrer (merge referrer-data {
            referral-count: (+ (get referral-count referrer-data) u1),
            tier: (calculate-tier (+ (get referral-count referrer-data) u1))
        }))
        
        (map-set referral-tree referrer (unwrap-panic (as-max-len? (append current-refs referee) u100)))
        (ok true)
    )
)

(define-private (calculate-tier (referral-count uint))
    (if (>= referral-count u100) u5
        (if (>= referral-count u50) u4
            (if (>= referral-count u25) u3
                (if (>= referral-count u10) u2
                    u1
                )
            )
        )
    )
)

(define-private (distribute-referral-reward (referrer principal))
    (let
        (
            (referrer-data (unwrap! (map-get? users referrer) ERR_INVALID_REFERRER))
            (tier-multiplier (get tier referrer-data))
            (reward (* BASE_REWARD tier-multiplier))
        )
        (asserts! (<= reward (var-get reward-pool)) ERR_INSUFFICIENT_REWARDS)
        
        (try! (as-contract (stx-transfer? reward tx-sender referrer)))
        
        (map-set users referrer (merge referrer-data {
            total-earned: (+ (get total-earned referrer-data) reward)
        }))
        
        (var-set reward-pool (- (var-get reward-pool) reward))
        (ok reward)
    )
)

(define-private (distribute-join-reward (new-user principal))
    (begin
        (asserts! (<= REFEREE_REWARD (var-get reward-pool)) ERR_INSUFFICIENT_REWARDS)
        (try! (as-contract (stx-transfer? REFEREE_REWARD tx-sender new-user)))
        (var-set reward-pool (- (var-get reward-pool) REFEREE_REWARD))
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

(define-read-only (get-user-info (user principal))
    (ok (map-get? users user))
)

(define-read-only (get-referrals (user principal))
    (ok (map-get? referral-tree user))
)

(define-read-only (get-stats)
    (ok {
        total-users: (var-get total-users),
        reward-pool: (var-get reward-pool)
    })
)
