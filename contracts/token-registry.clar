;; Token Registry Contract
;; Register and track custom tokens

(define-constant contract-owner tx-sender)
(define-constant err-not-found (err u404))

(define-map registered-tokens principal {name: (string-ascii 32), symbol: (string-ascii 10)})
(define-data-var token-count uint u0)

(define-public (register-token (name (string-ascii 32)) (symbol (string-ascii 10)))
  (let ((sender tx-sender))
    (map-set registered-tokens sender {name: name, symbol: symbol})
    (var-set token-count (+ (var-get token-count) u1))
    (ok true)
  )
)

(define-read-only (get-token-info (token principal))
  (ok (map-get? registered-tokens token))
)

(define-read-only (get-token-count)
  (ok (var-get token-count))
)
