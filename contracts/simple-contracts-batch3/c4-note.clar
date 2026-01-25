
;; Contract 4: Simple Note
(define-data-var note (string-utf8 100) u"Default Note")

(define-public (write-note (new-note (string-utf8 100)))
    (ok (var-set note new-note))
)

(define-read-only (read-note)
    (ok (var-get note))
)
