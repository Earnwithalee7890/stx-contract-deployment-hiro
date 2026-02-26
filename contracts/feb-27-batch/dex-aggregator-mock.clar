;; dex-aggregator-mock.clar
(define-public (fetch-best-route (from principal) (to principal) (amount uint))
    (ok {route: "direct", fee: u10}))
