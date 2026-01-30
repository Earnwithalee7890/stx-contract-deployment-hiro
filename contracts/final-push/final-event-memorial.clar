;; final-event-memorial.clar
;; Commemorative contract for Stacks Builder Rewards Jan 2026

(define-constant event-name "Stacks Builder Rewards Jan 2026")
(define-map participants principal bool)

(define-public (sign-guestbook)
    (begin
        (map-set participants tx-sender true)
        (print {event: "guestbook-signed", user: tx-sender, message: "I was there!"})
        (ok true)
    )
)

(define-read-only (was-here (user principal))
    (default-to false (map-get? participants user))
)
