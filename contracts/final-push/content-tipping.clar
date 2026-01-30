;; content-tipping.clar
;; Direct tipping contract

(define-public (tip (recipient principal) (amount uint) (memo (string-ascii 50)))
    (begin
        (try! (stx-transfer? amount tx-sender recipient))
        (print {event: "tip", from: tx-sender, to: recipient, amount: amount, memo: memo})
        (ok true)
    )
)
