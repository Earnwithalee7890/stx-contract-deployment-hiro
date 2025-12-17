;; title: Streak Bonus System
;; version: 1.0.0
;; summary: Bonus rewards for consecutive day streaks
;; description: Track user streaks and award bonuses

(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-too-soon (err u101))

(define-constant daily-fee u40000) ;; 0.04 STX
(define-constant blocks-per-day u144)

(define-data-var total-active-users uint u0)
(define-data-var bonus-pool uint u2000000) ;; 2 STX bonus pool

(define-map user-streaks principal {
  current-streak: uint,
  longest-streak: uint,
  last-check-in: uint,
  total-bonuses: uint
})

(define-public (check-in-for-streak)
  (let
    (
      (caller tx-sender)
      (today (/ stacks-block-height blocks-per-day))
      (user-data (default-to {current-streak: u0, longest-streak: u0, last-check-in: u0, total-bonuses: u0} (map-get? user-streaks caller)))
      (last-day (get last-check-in user-data))
      (current-streak (get current-streak user-data))
    )
    ;; Collect daily fee
    (try! (stx-transfer? daily-fee caller (as-contract tx-sender)))
    
    ;; Calculate new streak
    (let
      (
        (new-streak (if (is-eq (+ last-day u1) today)
                      (+ current-streak u1)
                      u1))
        (bonus (if (is-eq (mod new-streak u7) u0) ;; Bonus every 7 days
                 u50000 ;; 0.05 STX bonus
                 u0))
      )
      ;; Award bonus if applicable
      (if (> bonus u0)
        (begin
          (try! (as-contract (stx-transfer? bonus tx-sender caller)))
          (var-set bonus-pool (- (var-get bonus-pool) bonus))
          true
        )
        true
      )
      
      ;; Update streak
      (map-set user-streaks caller {
        current-streak: new-streak,
        longest-streak: (if (> new-streak (get longest-streak user-data)) new-streak (get longest-streak user-data)),
        last-check-in: today,
        total-bonuses: (+ (get total-bonuses user-data) bonus)
      })
      
      (print {event: "streak-check-in", user: caller, streak: new-streak, bonus: bonus})
      (ok {streak: new-streak, bonus:bonus})
    )
  )
)

(define-read-only (get-user-streak (user principal))
  (ok (map-get? user-streaks user))
)

(define-read-only (get-bonus-pool)
  (ok (var-get bonus-pool))
)
