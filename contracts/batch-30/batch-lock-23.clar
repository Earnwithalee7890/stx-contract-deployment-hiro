;; Simple Lock for 30-contract batch
(define-data-var locked bool false)

(define-public (toggle-lock)
    (begin
        (var-set locked (not (var-get locked)))
        (ok (var-get locked))))
