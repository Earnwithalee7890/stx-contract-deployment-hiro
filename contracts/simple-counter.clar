;; Simple Counter Contract
;; Increment and track counts

(define-data-var counter uint u0)
(define-map user-counts principal uint)

(define-public (increment)
  (let ((sender tx-sender))
    (var-set counter (+ (var-get counter) u1))
    (map-set user-counts sender (+ (get-user-count sender) u1))
    (ok (var-get counter))
  )
)

(define-public (increment-by (amount uint))
  (begin
    (var-set counter (+ (var-get counter) amount))
    (ok (var-get counter))
  )
)

(define-read-only (get-counter)
  (ok (var-get counter))
)

(define-read-only (get-user-count (user principal))
  (default-to u0 (map-get? user-counts user))
)
