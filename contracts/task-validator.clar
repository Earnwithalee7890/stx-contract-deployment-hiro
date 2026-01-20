;; title: task-validator
;; summary: Validates builder tasks and achievements.

(define-map tasks principal { completed: bool, timestamp: uint })

(define-public (complete-task)
    (begin
        (map-set tasks tx-sender { completed: true, timestamp: stacks-block-height })
        (ok true)
    )
)

(define-read-only (is-task-completed (user principal))
    (default-to { completed: false, timestamp: u0 } (map-get? tasks user))
)
