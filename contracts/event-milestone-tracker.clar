;; Title: Event Milestone Tracker
;; Description: Tracks specific milestones reached by participants.

(define-map milestones { user: principal, milestone-id: uint } { reached: bool, timestamp: uint })

(define-public (complete-milestone (milestone-id uint))
  (begin
    (asserts! (<= milestone-id u10) (err u102)) ;; Only 10 milestones defined for this event
    (map-set milestones { user: tx-sender, milestone-id: milestone-id } { reached: true, timestamp: block-height })
    (ok true)
  )
)

(define-read-only (has-completed-milestone (user principal) (milestone-id uint))
  (default-to { reached: false, timestamp: u0 } (map-get? milestones { user: user, milestone-id: milestone-id }))
)
