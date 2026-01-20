;; title: fee-distributor
;; summary: Distributes fees among multiple stakeholders.

(define-map shares principal uint)

(define-public (set-share (who principal) (amt uint))
    (begin
        (map-set shares who amt)
        (ok true)
    )
)

(define-read-only (get-share (who principal))
    (default-to u0 (map-get? shares who))
)
