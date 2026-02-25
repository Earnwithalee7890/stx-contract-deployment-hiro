;; Simple Alarm for 30-contract batch
(define-data-var alarm-time uint u0)

(define-public (set-alarm (time uint))
    (begin
        (var-set alarm-time time)
        (ok true)))
