;; vault-v3.clar
(define-map user-vaults principal {balance: uint, locked-until: uint})
(define-public (lock-stx (amount uint) (duration uint))
    (begin
        (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
        (map-set user-vaults tx-sender {balance: amount, locked-until: (+ block-height duration)})
        (ok true)))
