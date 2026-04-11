;; Project Submission Contract
;; Allows builders to submit their project URLs for evaluation.

(define-map submissions principal { url: (string-ascii 128), Evaluated: bool, score: uint })

(define-public (submit-project (url (string-ascii 128)))
  (begin
    (map-set submissions tx-sender { url: url, Evaluated: false, score: u0 })
    (ok true)
  )
)

(define-read-only (get-submission (user principal))
  (map-get? submissions user)
)
