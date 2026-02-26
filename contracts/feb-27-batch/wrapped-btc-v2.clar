;; wrapped-btc-v2.clar
(define-fungible-token xBTC)
(define-public (mint (amount uint) (recipient principal))
    (ft-mint? xBTC amount recipient))
