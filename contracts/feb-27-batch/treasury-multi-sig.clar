;; treasury-multi-sig.clar
(define-data-var threshold uint u2)
(define-public (propose-spend (amount uint) (recipient principal))
    (begin
        (print {action: "propose", amount: amount, to: recipient})
        (ok u1)))
