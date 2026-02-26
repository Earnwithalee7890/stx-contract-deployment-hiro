;; cross-chain-escrow.clar
(define-map escrow-funds principal uint)
(define-public (escrow-for-bridge (amount uint))
    (begin
        (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
        (map-set escrow-funds tx-sender amount)
        (ok true)))
