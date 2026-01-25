
;; Contract 15: Day Counter
(define-data-var day uint u1)

(define-public (next-day)
    (ok (var-set day (+ (var-get day) u1)))
)

(define-read-only (current-day)
    (ok (var-get day))
)
