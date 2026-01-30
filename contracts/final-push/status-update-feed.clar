;; status-update-feed.clar
;; On-chain microblogging

(define-map statuses principal (string-utf8 280))

(define-public (post-status (text (string-utf8 280)))
    (begin
        (map-set statuses tx-sender text)
        (print {event: "status-update", user: tx-sender, text: text})
        (ok true)
    )
)

(define-read-only (get-status (user principal))
    (map-get? statuses user)
)
