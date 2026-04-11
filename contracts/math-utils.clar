;; title: math-utils
;; summary: Basic math utility functions for Clarity contracts.

(define-read-only (safe-add (a uint) (b uint))
    (let ((res (+ a b)))
        (if (>= res a)
            (ok res)
            (err u401) ;; Overflow
        )
    )
)

(define-read-only (calculate-percentage (amount uint) (basis-points uint))
    (ok (/ (* amount basis-points) u10000))
)

(define-read-only (min (a uint) (b uint))
    (if (<= a b) (ok a) (ok b))
)

(define-read-only (max (a uint) (b uint))
    (if (>= a b) (ok a) (ok b))
)
