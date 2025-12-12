;; Timelock Contract
;; Lock STX until a specific block height

(define-constant err-too-early (err u100))
(define-constant err-not-found (err u101))

(define-map locks uint {
  owner: principal,
  amount: uint,
  unlock-height: uint,
  unlocked: bool
})
(define-data-var lock-nonce uint u0)

(define-public (create-lock (amount uint) (unlock-height uint))
  (let ((id (+ (var-get lock-nonce) u1)))
    (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
    (map-set locks id {
      owner: tx-sender,
      amount: amount,
      unlock-height: unlock-height,
      unlocked: false
    })
    (var-set lock-nonce id)
    (ok id)
  )
)

(define-public (unlock (lock-id uint))
  (match (map-get? locks lock-id)
    lock-data (begin
      (asserts! (>= stacks-block-height (get unlock-height lock-data)) err-too-early)
      (asserts! (is-eq tx-sender (get owner lock-data)) err-not-found)
      (try! (as-contract (stx-transfer? (get amount lock-data) tx-sender (get owner lock-data))))
      (map-set locks lock-id (merge lock-data {unlocked: true}))
      (ok true)
    )
    err-not-found
  )
)

(define-read-only (get-lock (id uint))
  (ok (map-get? locks id))
)
