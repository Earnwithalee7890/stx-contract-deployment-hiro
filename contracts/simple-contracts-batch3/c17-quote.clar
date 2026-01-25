
;; Contract 17: Quote of the Day
(define-data-var quote (string-utf8 100) u"Be yourself")

(define-public (update-quote (new-quote (string-utf8 100)))
    (ok (var-set quote new-quote))
)

(define-read-only (read-quote)
    (ok (var-get quote))
)
