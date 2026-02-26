;; oracle-price-feed.clar
(define-data-var last-price uint u50000)
(define-read-only (get-price (asset (string-ascii 10)))
    (ok (var-get last-price)))
