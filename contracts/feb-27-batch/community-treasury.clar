;; community-treasury.clar
(define-public (donate)
    (stx-transfer? u1000 tx-sender (as-contract tx-sender)))
