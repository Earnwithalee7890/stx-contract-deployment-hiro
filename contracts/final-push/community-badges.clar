;; community-badges.clar
;; Simple badge system

(define-map badges {user: principal, badge-id: uint} bool)

(define-public (award-badge (user principal) (badge-id uint))
    (begin
        ;; Only owner/admin logic omitted for brevity in this demo
        (map-set badges {user: user, badge-id: badge-id} true)
        (ok true)
    )
)

(define-read-only (has-badge (user principal) (badge-id uint))
    (default-to false (map-get? badges {user: user, badge-id: badge-id}))
)
