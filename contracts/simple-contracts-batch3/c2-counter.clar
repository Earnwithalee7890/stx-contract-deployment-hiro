
;; Contract 2: Simple Counter
(define-data-var counter int 0)

(define-read-only (get-count)
    (ok (var-get counter))
)

(define-public (increment)
    (ok (var-set counter (+ (var-get counter) 1)))
)

(define-public (decrement)
    (ok (var-set counter (- (var-get counter) 1)))
)
