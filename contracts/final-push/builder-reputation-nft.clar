;; builder-reputation-nft.clar
;; Soulbound Token (SBT) for builder reputation

(define-non-fungible-token builder-badge uint)
(define-data-var last-id uint u0)

(define-public (mint (recipient principal))
    (let ((token-id (+ (var-get last-id) u1)))
        (asserts! (is-eq tx-sender (var-get contract-owner)) (err u403))
        (try! (nft-mint? builder-badge token-id recipient))
        (var-set last-id token-id)
        (ok token-id)
    )
)

(define-public (transfer (token-id uint) (sender principal) (recipient principal))
    (err u100) ;; Soulbound: Transfer not allowed
)

(define-data-var contract-owner principal tx-sender)
