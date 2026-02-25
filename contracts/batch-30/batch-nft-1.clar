;; Simple NFT collection for 30-contract batch
(define-non-fungible-token batch-nft uint)
(define-data-var last-id uint u0)

(define-public (mint (recipient principal))
    (let ((id (+ (var-get last-id) u1)))
        (asserts! (is-eq tx-sender recipient) (err u403))
        (try! (nft-mint? batch-nft id recipient))
        (var-set last-id id)
        (ok id)))
