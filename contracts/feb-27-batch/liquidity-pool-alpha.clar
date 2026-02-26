;; liquidity-pool-alpha.clar
(define-data-var total-liquidity uint u0)
(define-public (add-liquidity (amount uint))
    (begin
        (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
        (var-set total-liquidity (+ (var-get total-liquidity) amount))
        (ok true)))
