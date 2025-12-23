;; Community Treasury with Multisig Governance
;; Allows community to propose and vote on treasury spending

(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_NOT_AUTHORIZED (err u401))
(define-constant ERR_ALREADY_VOTED (err u402))
(define-constant ERR_PROPOSAL_NOT_FOUND (err u403))
(define-constant ERR_PROPOSAL_EXPIRED (err u404))
(define-constant ERR_INSUFFICIENT_VOTES (err u405))

(define-data-var proposal-nonce uint u0)
(define-data-var required-votes uint u3) ;; Multisig threshold

(define-map proposals
    uint ;; proposal-id
    {
        proposer: principal,
        recipient: principal,
        amount: uint,
        description: (string-utf8 256),
        votes-for: uint,
        votes-against: uint,
        executed: bool,
        expires-at: uint
    }
)

(define-map votes
    {proposal-id: uint, voter: principal}
    {vote: bool}
)

(define-map signers principal bool)

;; Initialize signers
(map-set signers CONTRACT_OWNER true)

(define-public (add-signer (new-signer principal))
    (begin
        (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_NOT_AUTHORIZED)
        (ok (map-set signers new-signer true))
    )
)

(define-public (create-proposal (recipient principal) (amount uint) (description (string-utf8 256)))
    (let
        (
            (proposal-id (var-get proposal-nonce))
        )
        (asserts! (default-to false (map-get? signers tx-sender)) ERR_NOT_AUTHORIZED)
        (map-set proposals proposal-id {
            proposer: tx-sender,
            recipient: recipient,
            amount: amount,
            description: description,
            votes-for: u0,
            votes-against: u0,
            executed: false,
            expires-at: (+ block-height u144) ;; ~24 hours
        })
        (var-set proposal-nonce (+ proposal-id u1))
        (ok proposal-id)
    )
)

(define-public (vote-proposal (proposal-id uint) (vote-for bool))
    (let
        (
            (proposal (unwrap! (map-get? proposals proposal-id) ERR_PROPOSAL_NOT_FOUND))
            (existing-vote (map-get? votes {proposal-id: proposal-id, voter: tx-sender}))
        )
        (asserts! (default-to false (map-get? signers tx-sender)) ERR_NOT_AUTHORIZED)
        (asserts! (is-none existing-vote) ERR_ALREADY_VOTED)
        (asserts! (< block-height (get expires-at proposal)) ERR_PROPOSAL_EXPIRED)
        
        (map-set votes {proposal-id: proposal-id, voter: tx-sender} {vote: vote-for})
        
        (if vote-for
            (map-set proposals proposal-id (merge proposal {votes-for: (+ (get votes-for proposal) u1)}))
            (map-set proposals proposal-id (merge proposal {votes-against: (+ (get votes-against proposal) u1)}))
        )
        (ok true)
    )
)

(define-public (execute-proposal (proposal-id uint))
    (let
        (
            (proposal (unwrap! (map-get? proposals proposal-id) ERR_PROPOSAL_NOT_FOUND))
        )
        (asserts! (>= (get votes-for proposal) (var-get required-votes)) ERR_INSUFFICIENT_VOTES)
        (asserts! (not (get executed proposal)) ERR_NOT_AUTHORIZED)
        
        (try! (stx-transfer? (get amount proposal) (as-contract tx-sender) (get recipient proposal)))
        (map-set proposals proposal-id (merge proposal {executed: true}))
        (ok true)
    )
)

(define-read-only (get-proposal (proposal-id uint))
    (ok (map-get? proposals proposal-id))
)

(define-public (fund-treasury (amount uint))
    (stx-transfer? amount tx-sender (as-contract tx-sender))
)
