;; vesting-schedule-v5.clar
(define-map schedules principal {start: uint, amount: uint})
(define-public (create-schedule (p principal) (s uint) (a uint))
    (begin
        (map-set schedules p {start: s, amount: a})
        (ok true)))
