;; Simple Message for 30-contract batch
(define-data-var last-msg (string-ascii 100) "")

(define-public (post (msg (string-ascii 100)))
    (begin
        (var-set last-msg msg)
        (ok true)))
