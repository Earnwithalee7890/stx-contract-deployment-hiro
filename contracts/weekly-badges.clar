;; Weekly Badge System - Earn badges for daily check-ins
;; 7 unique badges (Monday-Sunday) with 0.01 STX fee each

(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_NOT_AUTHORIZED (err u401))
(define-constant ERR_ALREADY_EARNED_TODAY (err u402))
(define-constant ERR_INSUFFICIENT_FEE (err u403))

(define-constant BADGE_FEE u10000) ;; 0.01 STX
(define-constant FEE_RECIPIENT 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT)

;; Badge names for each day (0=Monday, 6=Sunday)
(define-constant BADGE_NAMES (list 
    "Monday Warrior ⚔️"
    "Tuesday Titan 💪"
    "Wednesday Winner 🏆"
    "Thursday Thunder ⚡"
    "Friday Fire 🔥"
    "Saturday Star ⭐"
    "Sunday Champion 👑"
))

(define-data-var total-badges-earned uint u0)

;; Track which badges users have earned (user -> day-of-week -> earned)
(define-map user-badges
    {user: principal, day: uint}
    {earned-at: uint, week-number: uint}
)

;; Track user stats
(define-map user-stats
    principal
    {
        total-earned: uint,
        current-streak: uint,
        longest-streak: uint,
        last-claim-day: uint
    }
)

(define-private (get-day-of-week)
    ;; Calculate day of week from block height (0=Monday, 6=Sunday)
    ;; Assuming ~144 blocks per day
    (mod (/ stacks-block-height u144) u7)
)

(define-private (get-week-number)
    (/ stacks-block-height u1008) ;; ~7 days in blocks
)

(define-public (earn-badge)
    (let
        (
            (current-day (get-day-of-week))
            (current-week (get-week-number))
            (existing-badge (map-get? user-badges {user: tx-sender, day: current-day}))
            (user-stat (default-to 
                {total-earned: u0, current-streak: u0, longest-streak: u0, last-claim-day: u999}
                (map-get? user-stats tx-sender)))
        )
        ;; Check if already earned this badge this week
        (asserts! 
            (or 
                (is-none existing-badge)
                (not (is-eq (get week-number (unwrap-panic existing-badge)) current-week))
            )
            ERR_ALREADY_EARNED_TODAY
        )
        
        ;; Collect 0.01 STX fee
        (try! (stx-transfer? BADGE_FEE tx-sender FEE_RECIPIENT))
        
        ;; Award badge
        (map-set user-badges {user: tx-sender, day: current-day} {
            earned-at: stacks-block-height,
            week-number: current-week
        })
        
        ;; Update streak
        (let
            (
                (is-consecutive (is-eq (get last-claim-day user-stat) (- current-day u1)))
                (new-streak (if is-consecutive 
                    (+ (get current-streak user-stat) u1)
                    u1
                ))
            )
            (map-set user-stats tx-sender {
                total-earned: (+ (get total-earned user-stat) u1),
                current-streak: new-streak,
                longest-streak: (if (> new-streak (get longest-streak user-stat))
                    new-streak
                    (get longest-streak user-stat)
                ),
                last-claim-day: current-day
            })
        )
        
        (var-set total-badges-earned (+ (var-get total-badges-earned) u1))
        (ok {day: current-day, week: current-week})
    )
)

(define-read-only (get-current-day)
    (ok (get-day-of-week))
)

(define-read-only (get-badge-name (day uint))
    (ok (unwrap-panic (element-at BADGE_NAMES day)))
)

(define-read-only (has-badge (user principal) (day uint))
    (ok (map-get? user-badges {user: user, day: day}))
)

(define-read-only (get-user-stats (user principal))
    (ok (map-get? user-stats user))
)

(define-read-only (get-weekly-progress (user principal))
    (ok {
        monday: (is-some (map-get? user-badges {user: user, day: u0})),
        tuesday: (is-some (map-get? user-badges {user: user, day: u1})),
        wednesday: (is-some (map-get? user-badges {user: user, day: u2})),
        thursday: (is-some (map-get? user-badges {user: user, day: u3})),
        friday: (is-some (map-get? user-badges {user: user, day: u4})),
        saturday: (is-some (map-get? user-badges {user: user, day: u5})),
        sunday: (is-some (map-get? user-badges {user: user, day: u6}))
    })
)

(define-read-only (get-total-badges-earned)
    (ok (var-get total-badges-earned))
)
