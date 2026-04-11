;; Title: Impact Rewards System
;; Description: Distributes rewards based on impact scores for the Talent Event.

(define-constant ADMIN tx-sender)

(define-map rewards-balance principal uint)

;; Public functions

(define-public (record-impact (user principal) (score uint))
  (begin
    (asserts! (is-eq tx-sender ADMIN) (err u100)) ;; Only admin can record impact
    (let 
      (
        (current-balance (default-to u0 (map-get? rewards-balance user)))
      )
      (map-set rewards-balance user (+ current-balance score))
      (ok true)
    )
  )
)

;; Read-only functions

(define-read-only (get-rewards (user principal))
  (default-to u0 (map-get? rewards-balance user))
)
