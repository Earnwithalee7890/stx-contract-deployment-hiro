;; social-graph-registry.clar
;; Identity mapping

(define-map profiles principal {handle: (string-ascii 20), bio: (string-ascii 100)})

(define-public (register (handle (string-ascii 20)) (bio (string-ascii 100)))
    (begin
        (map-set profiles tx-sender {handle: handle, bio: bio})
        (ok true)
    )
)

(define-read-only (get-profile (user principal))
    (map-get? profiles user)
)
