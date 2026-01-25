
;; Contract 6: Number Storage
(define-data-var stored-number uint u0)

(define-public (store-number (num uint))
    (ok (var-set stored-number num))
)

(define-read-only (get-number)
    (ok (var-get stored-number))
)
