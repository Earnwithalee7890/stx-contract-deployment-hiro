
;; Contract 9: Simple Flag
(define-data-var flag bool false)

(define-public (toggle-flag)
    (ok (var-set flag (not (var-get flag))))
)

(define-read-only (get-flag)
    (ok (var-get flag))
)
