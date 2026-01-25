
;; Contract 13: Event Logger
(define-public (log-action (action-id uint))
    (begin
        (print { event: "action", id: action-id, user: tx-sender })
        (ok true)
    )
)
