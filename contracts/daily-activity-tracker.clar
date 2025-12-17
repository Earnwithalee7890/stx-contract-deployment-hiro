;; title: Daily Activity Tracker
;; version: 1.0.0
;; summary: Track daily user activity with small fees
;; description: Simple daily check-in tracker with 0.05 STX fees

(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-invalid-day (err u101))

(define-constant daily-fee u50000) ;; 0.05 STX

(define-data-var total-check-ins uint u0)
(define-data-var total-users uint u0)
(define-data-var total-fees uint u0)

(define-map daily-activities principal (list 365 uint))
(define-map user-stats principal {
  total-days: uint,
  last-check-in: uint,
  fees-paid: uint
})

(define-public (check-in-today)
  (let
    (
      (caller tx-sender)
      (today (/ stacks-block-height u144))
      (user-days (default-to (list) (map-get? daily-activities caller)))
    )
    ;; Collect fee
    (try! (stx-transfer? daily-fee caller (as-contract tx-sender)))
    
    ;; Update stats
    (match (map-get? user-stats caller)
      stats (map-set user-stats caller {
        total-days: (+ (get total-days stats) u1),
        last-check-in: today,
        fees-paid: (+ (get fees-paid stats) daily-fee)
      })
      (begin
        (map-set user-stats caller {
          total-days: u1,
          last-check-in: today,
          fees-paid: daily-fee
        })
        (var-set total-users (+ (var-get total-users) u1))
      )
    )
    
    (var-set total-check-ins (+ (var-get total-check-ins) u1))
    (var-set total-fees (+ (var-get total-fees) daily-fee))
    (map-set daily-activities caller (unwrap-panic (as-max-len? (append user-days today) u365)))
    
    (print {event: "daily-check-in", user: caller, day: today, fee: daily-fee})
    (ok true)
  )
)

(define-read-only (get-user-stats (user principal))
  (ok (map-get? user-stats user))
)

(define-read-only (get-total-stats)
  (ok {
    total-check-ins: (var-get total-check-ins),
    total-users: (var-get total-users),
    total-fees: (var-get total-fees)
  })
)

(define-public (withdraw-fees)
  (let ((fees (var-get total-fees)))
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (try! (as-contract (stx-transfer? fees tx-sender contract-owner)))
    (var-set total-fees u0)
    (ok fees)
  )
)
