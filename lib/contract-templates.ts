
export interface ContractTemplate {
    id: string;
    name: string;
    description: string;
    code: string;
}

export const CONTRACT_TEMPLATES: ContractTemplate[] = [
    {
        id: 'impact-dao-voting',
        name: 'Impact DAO Voting',
        description: 'Decentralized voting mechanism for impact proposals.',
        code: `
;; impact-dao-voting.clar
;; Simple voting mechanism for impact proposals

(define-data-var proposal-count uint u0)
(define-map proposals uint {title: (string-ascii 50), votes-for: uint, votes-against: uint, status: (string-ascii 10)})
(define-map votes {proposal-id: uint, voter: principal} bool)

(define-public (create-proposal (title (string-ascii 50)))
    (let ((proposal-id (+ (var-get proposal-count) u1)))
        (map-set proposals proposal-id {title: title, votes-for: u0, votes-against: u0, status: "active"})
        (var-set proposal-count proposal-id)
        (ok proposal-id)
    )
)

(define-public (vote (proposal-id uint) (vote-for bool))
    (let (
        (proposal (unwrap! (map-get? proposals proposal-id) (err u404)))
        (previous-vote (map-get? votes {proposal-id: proposal-id, voter: tx-sender}))
    )
        (asserts! (is-none previous-vote) (err u403)) ;; Already voted
        (if vote-for
            (map-set proposals proposal-id (merge proposal {votes-for: (+ (get votes-for proposal) u1)}))
            (map-set proposals proposal-id (merge proposal {votes-against: (+ (get votes-against proposal) u1)}))
        )
        (map-set votes {proposal-id: proposal-id, voter: tx-sender} true)
        (ok true)
    )
)

(define-read-only (get-proposal (proposal-id uint))
    (map-get? proposals proposal-id)
)
`
    },
    {
        id: 'builder-reputation-nft',
        name: 'Builder Reputation NFT',
        description: 'Soulbound Token (SBT) for builder reputation.',
        code: `
;; builder-reputation-nft.clar
;; Soulbound Token (SBT) for builder reputation

(define-non-fungible-token builder-badge uint)
(define-data-var last-id uint u0)

(define-public (mint (recipient principal))
    (let ((token-id (+ (var-get last-id) u1)))
        (asserts! (is-eq tx-sender (var-get contract-owner)) (err u403))
        (try! (nft-mint? builder-badge token-id recipient))
        (var-set last-id token-id)
        (ok token-id)
    )
)

(define-public (transfer (token-id uint) (sender principal) (recipient principal))
    (err u100) ;; Soulbound: Transfer not allowed
)

(define-data-var contract-owner principal tx-sender)
`
    },
    {
        id: 'community-badges',
        name: 'Community Badges',
        description: 'Mintable badges for community participation.',
        code: `
;; community-badges.clar
;; Simple badge system

(define-map badges {user: principal, badge-id: uint} bool)

(define-public (award-badge (user principal) (badge-id uint))
    (begin
        ;; Only owner/admin logic omitted for brevity in this demo
        (map-set badges {user: user, badge-id: badge-id} true)
        (ok true)
    )
)

(define-read-only (has-badge (user principal) (badge-id uint))
    (default-to false (map-get? badges {user: user, badge-id: badge-id}))
)
`
    },
    {
        id: 'content-tipping',
        name: 'Content Tipping',
        description: 'Direct tipping contract for creators.',
        code: `
;; content-tipping.clar
;; Direct tipping contract

(define-public (tip (recipient principal) (amount uint) (memo (string-ascii 50)))
    (begin
        (try! (stx-transfer? amount tx-sender recipient))
        (print {event: "tip", from: tx-sender, to: recipient, amount: amount, memo: memo})
        (ok true)
    )
)
`
    },
    {
        id: 'status-update-feed',
        name: 'Status Update Feed',
        description: 'On-chain micro-blogging status updates.',
        code: `
;; status-update-feed.clar
;; On-chain microblogging

(define-map statuses principal (string-utf8 280))

(define-public (post-status (text (string-utf8 280)))
    (begin
        (map-set statuses tx-sender text)
        (print {event: "status-update", user: tx-sender, text: text})
        (ok true)
    )
)

(define-read-only (get-status (user principal))
    (map-get? statuses user)
)
`
    },
    {
        id: 'final-event-memorial',
        name: 'Event Memorial',
        description: 'Commemorative contract for the finale.',
        code: `
;; final-event-memorial.clar
;; Commemorative contract for Stacks Builder Rewards Jan 2026

(define-constant event-name "Stacks Builder Rewards Jan 2026")
(define-map participants principal bool)

(define-public (sign-guestbook)
    (begin
        (map-set participants tx-sender true)
        (print {event: "guestbook-signed", user: tx-sender, message: "I was there!"})
        (ok true)
    )
)

(define-read-only (was-here (user principal))
    (default-to false (map-get? participants user))
)
`
    },
    {
        id: 'simple-counter',
        name: 'Simple Counter',
        description: 'A basic counter that can be incremented or decremented.',
        code: `
;; Contract: Simple Counter
(define-data-var counter int 0)

(define-read-only (get-count)
    (ok (var-get counter))
)

(define-public (increment)
    (ok (var-set counter (+ (var-get counter) 1)))
)

(define-public (decrement)
    (ok (var-set counter (- (var-get counter) 1)))
)
`
    },
    {
        id: 'user-status',
        name: 'User Status',
        description: 'Allows users to set and retrieve a short text status.',
        code: `
;; Contract: Status Storage
(define-map user-status principal (string-ascii 20))

(define-public (set-status (status (string-ascii 20)))
    (ok (map-set user-status tx-sender status))
)

(define-read-only (get-status (user principal))
    (ok (map-get? user-status user))
)
`
    },
    {
        id: 'sticky-note',
        name: 'Sticky Note',
        description: 'A shared notepad where anyone can overwrite the note.',
        code: `
;; Contract: Simple Note
(define-data-var note (string-utf8 100) u"Default Note")

(define-public (write-note (new-note (string-utf8 100)))
    (ok (var-set note new-note))
)

(define-read-only (read-note)
    (ok (var-get note))
)
`
    },
    {
        id: 'owner-check',
        name: 'Owner Check',
        description: 'Demonstrates access control by checking the contract owner.',
        code: `
;; Contract: Owner Check
(define-constant contract-owner tx-sender)

(define-public (only-owner-action)
    (begin
        (asserts! (is-eq tx-sender contract-owner) (err u100))
        (ok "You are the owner")
    )
)
`
    },
    {
        id: 'number-store',
        name: 'Number Store',
        description: 'Stores a single positive integer (uint).',
        code: `
;; Contract: Number Storage
(define-data-var stored-number uint u0)

(define-public (store-number (num uint))
    (ok (var-set stored-number num))
)

(define-read-only (get-number)
    (ok (var-get stored-number))
)
`
    },
    {
        id: 'color-voting',
        name: 'Color Voting',
        description: 'A simple voting system for favorite colors.',
        code: `
;; Contract: Color Vote
(define-map votes (string-ascii 10) uint)

(define-public (vote-color (color (string-ascii 10)))
    (let ((current-votes (default-to u0 (map-get? votes color))))
        (ok (map-set votes color (+ current-votes u1)))
    )
)

(define-read-only (get-votes (color (string-ascii 10)))
    (ok (default-to u0 (map-get? votes color)))
)
`
    },
    {
        id: 'score-keeper',
        name: 'Score Keeper',
        description: 'Tracks game scores for different users.',
        code: `
;; Contract: Score Keeper
(define-map scores principal uint)

(define-public (set-score (score uint))
    (ok (map-set scores tx-sender score))
)

(define-read-only (get-my-score)
    (ok (default-to u0 (map-get? scores tx-sender)))
)
`
    },
    {
        id: 'simple-flag',
        name: 'Simple Flag',
        description: 'A boolean flag that can be toggled on/off.',
        code: `
;; Contract: Simple Flag
(define-data-var flag bool false)

(define-public (toggle-flag)
    (ok (var-set flag (not (var-get flag))))
)

(define-read-only (get-flag)
    (ok (var-get flag))
)
`
    },
    {
        id: 'like-button',
        name: 'Like Button',
        description: 'A global counter that increments when anyone calls it.',
        code: `
;; Contract: Like Button
(define-data-var likes uint u0)

(define-public (like)
    (ok (var-set likes (+ (var-get likes) u1)))
)

(define-read-only (get-likes)
    (ok (var-get likes))
)
`
    },
    {
        id: 'daily-checkin',
        name: 'Daily Check-In',
        description: 'Tracks how many times a user has checked in.',
        code: `
;; Contract: Check-In
(define-map check-ins principal uint)

(define-public (check-in)
    (let ((count (default-to u0 (map-get? check-ins tx-sender))))
        (ok (map-set check-ins tx-sender (+ count u1)))
    )
)
`
    },
    {
        id: 'verified-user',
        name: 'Verified User',
        description: 'A simple verification registry.',
        code: `
;; Contract: Verified User
(define-map verified principal bool)

(define-public (verify-me)
    (ok (map-set verified tx-sender true))
)

(define-read-only (is-verified (user principal))
    (ok (default-to false (map-get? verified user)))
)
`
    },
    {
        id: 'daily-quote',
        name: 'Daily Quote',
        description: 'Stores a quote string that can be updated.',
        code: `
;; Contract: Quote of the Day
(define-data-var quote (string-utf8 100) u"Be yourself")

(define-public (update-quote (new-quote (string-utf8 100)))
    (ok (var-set quote new-quote))
)

(define-read-only (read-quote)
    (ok (var-get quote))
)
`
    },
    {
        id: 'milestone-tracker',
        name: 'Milestone Tracker',
        description: 'Increments a global milestone counter.',
        code: `
;; Contract: Milestone Tracker
(define-data-var milestone uint u0)

(define-public (reach-milestone)
    (begin
        (var-set milestone (+ (var-get milestone) u1))
        (ok (var-get milestone))
    )
)
`
    },
    {
        id: 'day-counter',
        name: 'Day Counter',
        description: 'Simulates the passing of days manually.',
        code: `
;; Contract: Day Counter
(define-data-var day uint u1)

(define-public (next-day)
    (ok (var-set day (+ (var-get day) u1)))
)

(define-read-only (current-day)
    (ok (var-get day))
)
`
    },
    {
        id: 'name-registry',
        name: 'Name Registry',
        description: 'Maps user addresses to string names.',
        code: `
;; Contract: Name Registry
(define-map names principal (string-ascii 20))

(define-public (register-name (name (string-ascii 20)))
    (ok (map-set names tx-sender name))
)

(define-read-only (get-name (user principal))
    (ok (map-get? names user))
)
`
    },
    {
        id: 'math-helpers',
        name: 'Math Helpers',
        description: 'Simple read-only math functions.',
        code: `
;; Contract: Math Adder
(define-read-only (add (a uint) (b uint))
    (ok (+ a b))
)

(define-read-only (double (a uint))
    (ok (* a u2))
)
`
    },
    {
        id: 'event-logger',
        name: 'Event Logger',
        description: 'Demonstrates using print for off-chain logging.',
        code: `
;; Contract: Event Logger
(define-public (log-action (action-id uint))
    (begin
        (print { event: "action", id: action-id, user: tx-sender })
        (ok true)
    )
)
`
    },
    {
        id: 'error-constants',
        name: 'Error Constants',
        description: 'Defines and uses custom error codes.',
        code: `
;; Contract: Simple Constants
(define-constant err-custom (err u404))

(define-public (trigger-error)
    err-custom
)

(define-read-only (is-ok)
    (ok true)
)
`
    },
    {
        id: 'text-reverse',
        name: 'Text Store',
        description: 'Simple text storage (demonstrating strings).',
        code: `
;; Contract: Text Reverse (Mock)
(define-data-var reversed-text (string-ascii 20) "")

(define-public (set-reversed (text (string-ascii 20)))
    (ok (var-set reversed-text text))
)

(define-read-only (get-reversed)
    (ok (var-get reversed-text))
)
`
    }
];
