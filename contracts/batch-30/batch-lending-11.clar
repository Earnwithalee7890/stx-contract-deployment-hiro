;; Simple Lending for 30-contract batch
(define-map balances principal uint)

(define-public (borrow (amount uint))
    (ok amount)) ;; Mock borrow

(define-read-only (get-balance (user principal))
    (ok (default-to u0 (map-get? balances user))))
