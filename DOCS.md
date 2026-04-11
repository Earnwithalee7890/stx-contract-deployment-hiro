# Project Structure Overview

This repository contains a wide range of Stacks-related components, from smart contracts to frontend dashboards.

## Directories

### `/contracts`
Contains all Clarity smart contracts.
- `simple-*`: Production-ready simple utility contracts.
- `builder-*`: Contracts related to the Builder Rewards program.
- `dao-*`, `governance-*`: Protocol governance logic.
- `nft-*`: Marketplace and minting contracts.

### `/components`
React components for the Stacks dashboard.
- `/views`: Main page layouts (Admin, Dashboard, etc.)
- `/ui`: Reusable UI elements (Buttons, Inputs, Modals).

### `/scripts`
Utility scripts for maintenance and deployment.
- `manage-hooks.ts`: Chainhook management logic.
- `verify-contracts.ts`: Deployment status checks.

### `/lib`
Shared library functions and SDK wrappers.

### `/tests`
Clarinet and Vitest test suites.
