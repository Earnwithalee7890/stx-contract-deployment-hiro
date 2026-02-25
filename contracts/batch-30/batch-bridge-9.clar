;; Simple Bridge for 30-contract batch
(define-data-var bridge-fee uint u100)

(define-public (bridge (amount uint) (dest-chain (string-ascii 10)))
    (begin
        (try! (stx-transfer? (+ amount (var-get bridge-fee)) tx-sender (as-contract tx-sender)))
        (ok true)))
