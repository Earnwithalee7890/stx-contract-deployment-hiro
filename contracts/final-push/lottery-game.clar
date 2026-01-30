;; lottery-game.clar
;; Simple lottery

(define-map tickets uint principal)
(define-data-var ticket-count uint u0)
(define-constant ticket-price u1000000) ;; 1 STX

(define-public (buy-ticket)
    (let ((id (+ (var-get ticket-count) u1)))
        (try! (stx-transfer? ticket-price tx-sender (as-contract tx-sender)))
        (map-set tickets id tx-sender)
        (var-set ticket-count id)
        (ok id)
    )
)
