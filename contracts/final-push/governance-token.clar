;; governance-token.clar
;; Simplified SIP-010 token

(define-fungible-token gov-token u100000000)

(define-public (mint (amount uint) (recipient principal))
    (begin
        ;; Access control check omitted for demo
        (ft-mint? gov-token amount recipient)
    )
)

(define-public (transfer (amount uint) (sender principal) (recipient principal))
    (begin
        (asserts! (is-eq tx-sender sender) (err u401))
        (ft-transfer? gov-token amount sender recipient)
    )
)
