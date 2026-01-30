;; nft-marketplace-v1.clar
;; Simple marketplace

(define-map listings uint {seller: principal, price: uint})

(define-public (list-item (token-id uint) (price uint))
    ;; Assume ownership check passed for demo
    (begin
        (map-set listings token-id {seller: tx-sender, price: price})
        (ok true)
    )
)

(define-public (buy-item (token-id uint))
    (let ((listing (unwrap! (map-get? listings token-id) (err u404))))
        (try! (stx-transfer? (get price listing) tx-sender (get seller listing)))
        ;; Transfer NFT logic here
        (map-delete listings token-id)
        (ok true)
    )
)
