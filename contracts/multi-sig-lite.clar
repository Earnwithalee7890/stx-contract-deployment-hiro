;; title: multi-sig-lite
;; summary: A lightweight multi-signature approval mechanism.

(define-map approvals (buff 32) uint)

(define-public (approve (tx-hash (buff 32)))
    (begin
        (map-set approvals tx-hash (+ (default-to u0 (map-get? approvals tx-hash)) u1))
        (ok true)
    )
)

(define-read-only (get-approvals (tx-hash (buff 32)))
    (default-to u0 (map-get? approvals tx-hash))
)
