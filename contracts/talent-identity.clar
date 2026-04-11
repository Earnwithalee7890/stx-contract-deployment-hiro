;; Title: Talent Identity
;; Description: Links Stacks addresses to social identities (mock).

(define-map identity principal (string-ascii 64))

(define-public (set-handle (handle (string-ascii 64)))
  (begin
    (map-set identity tx-sender handle)
    (ok true)
  )
)

(define-read-only (get-handle (user principal))
  (map-get? identity user)
)
