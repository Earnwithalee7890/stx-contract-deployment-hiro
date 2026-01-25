
# Manual Deployment Instructions for Batch 3

Here are the 20 Clarity contracts you requested. You can deploy them manually using the [Hiro Explorer Sandbox](https://explorer.hiro.so/sandbox/deploy?chain=mainnet) or the Stacks CLI.

## Contract List & Source Paths

1.  **Hello World**: `c1-hello.clar` - Basic storage.
2.  **Counter**: `c2-counter.clar` - Increment/Decrement logic.
3.  **User Status**: `c3-status.clar` - Map-based status.
4.  **Note**: `c4-note.clar` - String storage.
5.  **Owner Only**: `c5-owner.clar` - Auth check pattern.
6.  **Number Store**: `c6-number.clar` - Uint storage.
7.  **Color Vote**: `c7-color-vote.clar` - Voting logic.
8.  **Score Keeper**: `c8-scores.clar` - Gaming pattern.
9.  **Flag**: `c9-flag.clar` - Boolean toggle.
10. **Like Button**: `c10-like.clar` - Global counter.
11. **Reverse**: `c11-reverse.clar` - Text manipulation.
12. **Constants**: `c12-constant.clar` - Error handling.
13. **Logger**: `c13-logger.clar` - Print events.
14. **Milestone**: `c14-milestone.clar` - Sequential steps.
15. **Day Counter**: `c15-day.clar` - Time simulation.
16. **Names**: `c16-names.clar` - Registry pattern.
17. **Daily Quote**: `c17-quote.clar` - Admin update pattern.
18. **Math**: `c18-math.clar` - Pure functions.
19. **Check-In**: `c19-checkin.clar` - Activity tracking.
20. **Verified**: `c20-verified.clar` - Identity logic.

## CLI Deployment Commands (PowerShell)

If you have the Stacks CLI installed, you can run these commands from this directory:

```powershell
# Configure your private key first in the CLI or use --private_key (not recommended for logs)

stx deploy_contract c1-hello c1-hello.clar --network mainnet
stx deploy_contract c2-counter c2-counter.clar --network mainnet
stx deploy_contract c3-status c3-status.clar --network mainnet
# ... repeat for all files
```

## Quick Copy-Paste for Sandbox

1. Open `c1-hello.clar` -> Copy Content -> Paste in Sandbox -> Deploy.
2. Repeat for all 20 files.
