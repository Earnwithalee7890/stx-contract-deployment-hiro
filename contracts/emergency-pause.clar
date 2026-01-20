;; title: emergency-pause
;; summary: Emergency pause mechanism for builder protocols.

(define-data-var paused bool false)

(define-public (toggle-pause)
    (begin
        (var-set paused (not (var-get paused)))
        (ok (var-get paused))
    )
)

(define-read-only (is-paused)
    (ok (var-get paused))
)
