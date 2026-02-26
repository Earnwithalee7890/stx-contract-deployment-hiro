;; swap-v1.clar
(define-map balances principal uint)
(define-public (swap-stx-to-token (amount uint))
    (begin
        (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
        (ok true)))
(define-read-only (get-rate) (ok u100))
