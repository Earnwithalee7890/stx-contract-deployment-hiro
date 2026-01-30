;; vesting-schedule.clar
;; Token vesting

(define-map schedules principal {total: uint, released: uint, start: uint})

(define-public (create-vesting (beneficiary principal) (amount uint))
    (begin
        (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
        (map-set schedules beneficiary {total: amount, released: u0, start: block-height})
        (ok true)
    )
)

;; Simplify release logic for demo: linear release over 100 blocks
(define-public (release)
    (let ((sch (unwrap! (map-get? schedules tx-sender) (err u404))))
        ;; Logic omitted, assuming release of 10%
        (let ((release-amount (/ (get total sch) u10)))
            (try! (as-contract (stx-transfer? release-amount tx-sender tx-sender)))
            (ok release-amount)
        )
    )
)
