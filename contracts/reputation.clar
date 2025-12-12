;; Reputation System Contract
;; Track user reputation scores

(define-map reputation principal {score: uint, endorsements: uint})
(define-map endorsers {user: principal, endorser: principal} bool)

(define-public (endorse (user principal))
  (let ((endorser tx-sender))
    (asserts! (not (is-eq user endorser)) (err u100))
    (asserts! (is-none (map-get? endorsers {user: user, endorser: endorser})) (err u101))
    
    (map-set endorsers {user: user, endorser: endorser} true)
    (match (map-get? reputation user)
      rep (map-set reputation user {
        score: (+ (get score rep) u10),
        endorsements: (+ (get endorsements rep) u1)
      })
      (map-set reputation user {score: u10, endorsements: u1})
    )
    (ok true)
  )
)

(define-public (add-reputation (user principal) (points uint))
  (match (map-get? reputation user)
    rep (map-set reputation user (merge rep {score: (+ (get score rep) points)}))
    (map-set reputation user {score: points, endorsements: u0})
  )
  (ok true)
)

(define-read-only (get-reputation (user principal))
  (ok (map-get? reputation user))
)

(define-read-only (has-endorsed (user principal) (endorser principal))
  (ok (default-to false (map-get? endorsers {user: user, endorser: endorser})))
)
