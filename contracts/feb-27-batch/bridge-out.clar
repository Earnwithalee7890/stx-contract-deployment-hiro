;; bridge-out.clar
(define-data-var bridge-fee uint u100)
(define-public (bridge-to-l1 (amount uint) (destination (buff 32)))
    (begin
        (try! (stx-transfer? (+ amount (var-get bridge-fee)) tx-sender (as-contract tx-sender)))
        (print {action: "bridge-out", amount: amount, dest: destination})
        (ok true)))
