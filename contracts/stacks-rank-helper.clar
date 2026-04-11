;; Title: Stacks Rank Helper
;; Description: Provides utility functions to interface with ranking logic.

(define-constant MIN-RANK-SCORE u100)

(define-read-only (is-eligible-for-rewards (score uint))
  (if (>= score MIN-RANK-SCORE)
      (ok true)
      (err u201) ;; Score too low
  )
)

(define-read-only (calculate-rank-multiplier (score uint))
  (if (> score u1000)
      u200 ;; 2x multiplier
      u100 ;; 1x multiplier
  )
)
