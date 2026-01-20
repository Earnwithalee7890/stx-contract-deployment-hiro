;; title: milestone-notifier
;; summary: Emits events when builders reach specific milestones.

(define-public (emit-milestone (milestone-id uint))
    (begin
        (print { event: "milestone-reached", user: tx-sender, id: milestone-id, block: stacks-block-height })
        (ok true)
    )
)
