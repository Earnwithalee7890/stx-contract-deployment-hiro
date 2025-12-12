;; STX Vault Contract
;; A simple vault for storing and managing STX

(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-insufficient-balance (err u101))

(define-data-var total-deposits uint u0)

(define-map user-balances principal uint)

(define-public (deposit (amount uint))
  (let ((sender tx-sender))
    (try! (stx-transfer? amount sender (as-contract tx-sender)))
    (map-set user-balances sender (+ (get-balance sender) amount))
    (var-set total-deposits (+ (var-get total-deposits) amount))
    (ok amount)
  )
)

(define-public (withdraw (amount uint))
  (let ((sender tx-sender) (balance (get-balance sender)))
    (asserts! (>= balance amount) err-insufficient-balance)
    (try! (as-contract (stx-transfer? amount tx-sender sender)))
    (map-set user-balances sender (- balance amount))
    (ok amount)
  )
)

(define-read-only (get-balance (user principal))
  (default-to u0 (map-get? user-balances user))
)

(define-read-only (get-total-deposits)
  (ok (var-get total-deposits))
)
