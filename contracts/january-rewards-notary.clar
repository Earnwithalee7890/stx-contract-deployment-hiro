;; title: january-rewards-notary
;; summary: Special notary for January Builder Rewards achievements.

(define-map achievements (buff 32) { user: principal, timestamp: uint, description: (string-ascii 50) })

(define-public (note-achievement (id (buff 32)) (desc (string-ascii 50)))
    (begin
        (map-set achievements id { user: tx-sender, timestamp: stacks-block-height, description: desc })
        (ok true)
    )
)
