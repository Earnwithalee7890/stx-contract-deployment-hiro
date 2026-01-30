;; achievement-tracker.clar
;; Gamification

(define-map achievements {user: principal, id: uint} bool)

(define-public (unlock-achievement (id uint))
    (begin
        (map-set achievements {user: tx-sender, id: id} true)
        (print {event: "achievement-unlocked", user: tx-sender, id: id})
        (ok true)
    )
)
