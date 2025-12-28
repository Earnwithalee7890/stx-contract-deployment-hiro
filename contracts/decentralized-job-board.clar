;; Title: Decentralized Job Board
;; Description: A platform for posting Stacks developer jobs with escrowed STX rewards.

;; Constants
(define-constant ERR-NOT-AUTHORIZED (err u100))
(define-constant ERR-JOB-NOT-FOUND (err u101))
(define-constant ERR-JOB-ALREADY-COMPLETED (err u102))
(define-constant ERR-INSUFFICIENT-FUNDS (err u103))

;; Data Maps
(define-map jobs
    uint
    {
        employer: principal,
        title: (string-ascii 64),
        description-url: (string-ascii 256),
        reward: uint,
        status: (string-ascii 20), ;; "OPEN", "IN-PROGRESS", "COMPLETED"
        worker: (optional principal)
    }
)

(define-data-var job-nonce uint u0)

;; Public Functions

;; 1. Post a job with reward Escrowed
(define-public (post-job (title (string-ascii 64)) (desc-url (string-ascii 256)) (reward uint))
    (let ((id (var-get job-nonce)))
        (try! (stx-transfer? reward tx-sender (as-contract tx-sender)))
        (map-set jobs id {
            employer: tx-sender,
            title: title,
            description-url: desc-url,
            reward: reward,
            status: "OPEN",
            worker: none
        })
        (var-set job-nonce (+ id u1))
        (ok id)
    )
)

;; 2. Apply for a job
(define-public (apply-for-job (id uint))
    (let ((job (unwrap! (map-get? jobs id) ERR-JOB-NOT-FOUND)))
        (asserts! (is-eq (get status job) "OPEN") (err u104))
        (map-set jobs id (merge job { 
            status: "IN-PROGRESS",
            worker: (some tx-sender)
        }))
        (ok true)
    )
)

;; 3. Employer completes job and releases payment
(define-public (complete-job (id uint))
    (let ((job (unwrap! (map-get? jobs id) ERR-JOB-NOT-FOUND)))
        (asserts! (is-eq tx-sender (get employer job)) ERR-NOT-AUTHORIZED)
        (asserts! (is-eq (get status job) "IN-PROGRESS") (err u105))
        
        (let ((worker-principal (unwrap! (get worker job) (err u106))))
            (try! (as-contract (stx-transfer? (get reward job) tx-sender worker-principal)))
            (map-set jobs id (merge job { status: "COMPLETED" }))
            (ok true)
        )
    )
)

;; Read-only Functions
(define-read-only (get-job (id uint))
    (ok (map-get? jobs id))
)

(define-read-only (get-total-jobs)
    (ok (var-get job-nonce))
)
