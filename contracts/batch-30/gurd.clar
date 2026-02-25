;; Simple Guard for 30-contract batch
(define-constant admin tx-sender)

(define-public (check-admin)
    (if (is-eq tx-sender admin) (ok true) (err u401)))
