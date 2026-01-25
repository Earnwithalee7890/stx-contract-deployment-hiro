
;; Contract 1: Hello World
(define-data-var message (string-utf8 50) u"Hello Stacks")

(define-read-only (get-message)
    (ok (var-get message))
)

(define-public (set-message (new-message (string-utf8 50)))
    (ok (var-set message new-message))
)
