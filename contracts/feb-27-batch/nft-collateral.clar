;; nft-collateral.clar
(define-map nft-loans uint {owner: principal, amount: uint})
(define-public (lock-nft (id uint) (loan uint))
    (begin
        (map-set nft-loans id {owner: tx-sender, amount: loan})
        (ok true)))
