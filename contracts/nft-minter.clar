;; NFT Minter Contract
;; Mint simple NFTs

(define-non-fungible-token simple-nft uint)

(define-data-var token-id-nonce uint u0)
(define-map token-metadata uint {uri: (string-ascii 256)})

(define-public (mint-nft (uri (string-ascii 256)))
  (let ((token-id (+ (var-get token-id-nonce) u1)))
    (try! (nft-mint? simple-nft token-id tx-sender))
    (map-set token-metadata token-id {uri: uri})
    (var-set token-id-nonce token-id)
    (ok token-id)
  )
)

(define-public (transfer-nft (token-id uint) (recipient principal))
  (nft-transfer? simple-nft token-id tx-sender recipient)
)

(define-read-only (get-owner (token-id uint))
  (ok (nft-get-owner? simple-nft token-id))
)

(define-read-only (get-token-uri (token-id uint))
  (ok (map-get? token-metadata token-id))
)

(define-read-only (get-last-token-id)
  (ok (var-get token-id-nonce))
)
