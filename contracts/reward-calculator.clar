;; title: reward-calculator
;; summary: Calculates builder rewards based on participation levels.

(define-constant level-1 u10)
(define-constant level-2 u50)
(define-constant level-3 u100)

(define-read-only (calculate-reward (score uint))
    (if (>= score level-3)
        u1000
        (if (>= score level-2)
            u500
            (if (>= score level-1)
                u100
                u0
            )
        )
    )
)
