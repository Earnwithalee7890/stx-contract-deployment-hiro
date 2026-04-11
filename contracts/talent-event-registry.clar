;; Title: Talent Event Registry
;; Description: Registers participants for the April 2026 Stacks Talent Event.

(define-map participants principal 
  { 
    registered: bool, 
    timestamp: uint, 
    impact-score: uint 
  }
)

(define-data-var total-participants uint u0)

;; Public functions

(define-public (register-for-event)
  (let 
    (
      (sender tx-sender)
    )
    (asserts! (is-none (get registered (map-get? participants sender))) (err u101)) ;; Already registered
    (map-set participants sender { registered: true, timestamp: block-height, impact-score: u0 })
    (var-set total-participants (+ (var-get total-participants) u1))
    (ok true)
  )
)

;; Read-only functions

(define-read-only (get-participant-info (user principal))
  (map-get? participants user)
)

(define-read-only (get-total-participants)
  (ok (var-get total-participants))
)
