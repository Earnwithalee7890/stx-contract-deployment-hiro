# Sample Usage: Interacting with Talent Event Contracts

## Registering for the Event
To register, call the `register-for-event` function in `talent-event-registry`.

```clarity
(contract-call? .talent-event-registry register-for-event)
```

## Submitting a Project
Submit your project URL for evaluation:

```clarity
(contract-call? .project-submission-v1 submit-project "https://github.com/user/my-stacks-project")
```

## Checking Reputation
Get your current reputation score:

```clarity
(contract-call? .reputation get-reputation tx-sender)
```
