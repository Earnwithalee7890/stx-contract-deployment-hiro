;; limit-order-mock.clar
(define-map orders uint {price: uint, amount: uint})
(define-public (place-order (id uint) (p uint) (a uint))
    (begin
        (map-set orders id {price: p, amount: a})
        (ok true)))
