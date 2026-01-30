;; project-launchpad.clar
;; Crowdfunding logic

(define-map campaigns uint {owner: principal, target: uint, raised: uint, deadline: uint, claimed: bool})
(define-map contributions {campaign-id: uint, contributor: principal} uint)
(define-data-var last-id uint u0)

(define-public (create-campaign (target uint) (duration uint))
    (let ((id (+ (var-get last-id) u1)))
        (map-set campaigns id {owner: tx-sender, target: target, raised: u0, deadline: (+ block-height duration), claimed: false})
        (var-set last-id id)
        (ok id)
    )
)

(define-public (contribute (id uint) (amount uint))
    (let ((campaign (unwrap! (map-get? campaigns id) (err u404))))
        (asserts! (< block-height (get deadline campaign)) (err u400))
        (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
        (map-set campaigns id (merge campaign {raised: (+ (get raised campaign) amount)}))
        (map-set contributions {campaign-id: id, contributor: tx-sender} (+ (default-to u0 (map-get? contributions {campaign-id: id, contributor: tx-sender})) amount))
        (ok true)
    )
)
