;; Payment Splitter with Royalty Support
;; Splits payments among multiple recipients with customizable shares

(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_NOT_AUTHORIZED (err u401))
(define-constant ERR_INVALID_SHARES (err u402))
(define-constant ERR_NO_BALANCE (err u403))
(define-constant ERR_RECIPIENT_EXISTS (err u404))

(define-data-var total-shares uint u0)
(define-data-var total-released uint u0)

(define-map shares principal uint)
(define-map released principal uint)
(define-map recipients principal bool)

;; Initialize with owner
(map-set shares CONTRACT_OWNER u50)
(map-set recipients CONTRACT_OWNER true)
(var-set total-shares u50)

(define-public (add-recipient (recipient principal) (share-amount uint))
    (begin
        (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_NOT_AUTHORIZED)
        (asserts! (> share-amount u0) ERR_INVALID_SHARES)
        (asserts! (is-none (map-get? recipients recipient)) ERR_RECIPIENT_EXISTS)
        
        (map-set shares recipient share-amount)
        (map-set released recipient u0)
        (map-set recipients recipient true)
        (var-set total-shares (+ (var-get total-shares) share-amount))
        (ok true)
    )
)

(define-public (update-shares (recipient principal) (new-share uint))
    (let
        (
            (old-share (default-to u0 (map-get? shares recipient)))
        )
        (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_NOT_AUTHORIZED)
        (asserts! (> new-share u0) ERR_INVALID_SHARES)
        
        (map-set shares recipient new-share)
        (var-set total-shares (+ (- (var-get total-shares) old-share) new-share))
        (ok true)
    )
)

(define-private (calculate-payment (recipient principal))
    (let
        (
            (total-received (stx-get-balance (as-contract tx-sender)))
            (recipient-share (default-to u0 (map-get? shares recipient)))
            (already-released (default-to u0 (map-get? released recipient)))
            (total-allocation (/ (* total-received recipient-share) (var-get total-shares)))
        )
        (if (> total-allocation already-released)
            (- total-allocation already-released)
            u0
        )
    )
)

(define-public (release (recipient principal))
    (let
        (
            (payment (calculate-payment recipient))
        )
        (asserts! (> payment u0) ERR_NO_BALANCE)
        
        (try! (as-contract (stx-transfer? payment tx-sender recipient)))
        
        (map-set released recipient (+ (default-to u0 (map-get? released recipient)) payment))
        (var-set total-released (+ (var-get total-released) payment))
        (ok payment)
    )
)

(define-public (release-all)
    (begin
        ;; This would iterate through all recipients
        ;; For simplicity, users call release individually
        (release tx-sender)
    )
)

(define-read-only (get-shares (recipient principal))
    (ok (map-get? shares recipient))
)

(define-read-only (get-released (recipient principal))
    (ok (map-get? released recipient))
)

(define-read-only (get-pending-payment (recipient principal))
    (ok (calculate-payment recipient))
)

(define-read-only (get-total-shares)
    (ok (var-get total-shares))
)

;; Accept payments
(define-public (receive-payment (amount uint))
    (stx-transfer? amount tx-sender (as-contract tx-sender))
)
