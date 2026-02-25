;; Simple Finale for 30-contract batch
(define-data-var status (string-ascii 10) "complete")

(define-read-only (get-status)
    (ok (var-get status)))
