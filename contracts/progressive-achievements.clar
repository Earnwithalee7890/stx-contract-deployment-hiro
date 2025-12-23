;; Progressive Achievement & Badge System
;; Award badges for milestones and track user progression

(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_NOT_AUTHORIZED (err u401))
(define-constant ERR_BADGE_EXISTS (err u402))
(define-constant ERR_ALREADY_EARNED (err u403))
(define-constant ERR_REQUIREMENTS_NOT_MET (err u404))

(define-data-var badge-nonce uint u0)

(define-map badges
    uint ;; badge-id
    {
        name: (string-utf8 64),
        description: (string-utf8 256),
        requirement-type: (string-ascii 32),
        requirement-value: uint,
        total-awarded: uint,
        active: bool
    }
)

(define-map user-badges
    {user: principal, badge-id: uint}
    {earned-at: uint, progress: uint}
)

(define-map user-stats
    principal
    {
        total-badges: uint,
        total-points: uint,
        level: uint
    }
)

;; Badge types: "check-ins", "transactions", "volume", "referrals"
(define-public (create-badge 
    (name (string-utf8 64))
    (description (string-utf8 256))
    (requirement-type (string-ascii 32))
    (requirement-value uint))
    (let
        (
            (badge-id (var-get badge-nonce))
        )
        (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_NOT_AUTHORIZED)
        
        (map-set badges badge-id {
            name: name,
            description: description,
            requirement-type: requirement-type,
            requirement-value: requirement-value,
            total-awarded: u0,
            active: true
        })
        
        (var-set badge-nonce (+ badge-id u1))
        (ok badge-id)
    )
)

(define-public (award-badge (user principal) (badge-id uint))
    (let
        (
            (badge (unwrap! (map-get? badges badge-id) ERR_NOT_AUTHORIZED))
            (existing-badge (map-get? user-badges {user: user, badge-id: badge-id}))
            (user-stat (default-to {total-badges: u0, total-points: u0, level: u1} 
                        (map-get? user-stats user)))
        )
        (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_NOT_AUTHORIZED)
        (asserts! (is-none existing-badge) ERR_ALREADY_EARNED)
        (asserts! (get active badge) ERR_NOT_AUTHORIZED)
        
        (map-set user-badges {user: user, badge-id: badge-id} {
            earned-at: block-height,
            progress: u100
        })
        
        (map-set badges badge-id (merge badge {
            total-awarded: (+ (get total-awarded badge) u1)
        }))
        
        (map-set user-stats user {
            total-badges: (+ (get total-badges user-stat) u1),
            total-points: (+ (get total-points user-stat) u10),
            level: (calculate-level (+ (get total-points user-stat) u10))
        })
        
        (ok true)
    )
)

(define-public (update-progress (user principal) (badge-id uint) (progress uint))
    (begin
        (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_NOT_AUTHORIZED)
        
        (map-set user-badges {user: user, badge-id: badge-id} {
            earned-at: u0,
            progress: progress
        })
        (ok true)
    )
)

(define-private (calculate-level (points uint))
    (if (>= points u100) u10
        (if (>= points u80) u9
            (if (>= points u60) u8
                (if (>= points u50) u7
                    (if (>= points u40) u6
                        (if (>= points u30) u5
                            (if (>= points u20) u4
                                (if (>= points u10) u3
                                    (if (>= points u5) u2
                                        u1
                                    )
                                )
                            )
                        )
                    )
                )
            )
        )
    )
)

(define-read-only (get-badge (badge-id uint))
    (ok (map-get? badges badge-id))
)

(define-read-only (has-badge (user principal) (badge-id uint))
    (ok (map-get? user-badges {user: user, badge-id: badge-id}))
)

(define-read-only (get-user-stats (user principal))
    (ok (map-get? user-stats user))
)

(define-read-only (get-user-level (user principal))
    (ok (get level (default-to {total-badges: u0, total-points: u0, level: u1} 
                    (map-get? user-stats user))))
)
