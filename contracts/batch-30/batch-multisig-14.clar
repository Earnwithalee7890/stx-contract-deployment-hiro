;; Simple Multi-sig for 30-contract batch
(define-data-var threshold uint u2)
(define-data-var signers (list 3 principal) (list))

(define-public (add-signer (signer principal))
    (begin
        (var-set signers (unwrap! (as-max-len? (append (var-get signers) signer) u3) (err u500)))
        (ok true)))
