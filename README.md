# Stacks Smart Contracts Collection

[![NPM Version](https://img.shields.io/npm/v/@earnwithalee/stx-contract?style=flat-square&color=orange)](https://www.npmjs.com/package/@earnwithalee/stx-contract)
[![NPM Downloads](https://img.shields.io/npm/dw/@earnwithalee/stx-contract?style=flat-square&color=blue)](https://www.npmjs.com/package/@earnwithalee/stx-contract)
[![License](https://img.shields.io/npm/l/@earnwithalee/stx-contract?style=flat-square&color=green)](LICENSE)
[![CI](https://img.shields.io/github/actions/workflow/status/Earnwithalee7890/stx-contract-deployment-hiro/sdk-integration-test.yml?label=SDK%20Tests&style=flat-square)](https://github.com/Earnwithalee7890/stx-contract-deployment-hiro/actions)

A comprehensive collection of Clarity smart contracts for the Stacks blockchain ecosystem, powered by the **@earnwithalee/stx-contract** SDK.

---

## 📦 @earnwithalee/stx-contract — Official SDK

Premium SDK for interacting with Stacks smart contracts. Fully typed, network-agnostic, and optimized for modern frontend frameworks.

### Installation

```bash
npm install @earnwithalee/stx-contract
```

```bash
yarn add @earnwithalee/stx-contract
```

```bash
pnpm add @earnwithalee/stx-contract
```

### Quick Start

```typescript
import { StxContractClient } from '@earnwithalee/stx-contract';

// Initialize the client
const client = new StxContractClient({ network: 'mainnet' });
```

### 🔗 Wallet Connection

```typescript
import sdk from '@earnwithalee/stx-contract';

// Connect wallet
const address = await sdk.wallet.connectWallet();
console.log('Connected:', address);

// Detect wallet provider
const { available, provider } = sdk.wallet.detectWallet();

// Format address for display
const short = sdk.wallet.formatAddress(address); // "SP2F...NFBT"
```

### 📊 API — Balances & Transactions

```typescript
import sdk from '@earnwithalee/stx-contract';

// Get STX balance
const balance = await sdk.api.getBalance('SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT');
console.log('Balance:', balance.stx, 'STX');

// Get transactions
const txs = await sdk.api.getTransactions('SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT');

// Get current block height
const height = await sdk.api.getBlockHeight();

// Check transaction status
const status = await sdk.api.getTransactionStatus('0xabc...');

// Read contract state
const result = await sdk.api.readContract({
  contractAddress: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT',
  contractName: 'builder-rewards-v3',
  functionName: 'get-total-fees-collected',
  functionArgs: [],
});
```

### 🔧 Encoding — Clarity Value Encoding

```typescript
import sdk from '@earnwithalee/stx-contract';

// Encode different Clarity types
const strAscii = sdk.encoding.encodeStringAscii('hello-stacks');
const strUtf8  = sdk.encoding.encodeStringUtf8('Hello Stacks 🚀');
const uint     = sdk.encoding.encodeUint(1000000n);
const int      = sdk.encoding.encodeInt(-42);
const bool     = sdk.encoding.encodeBool(true);
const principal = sdk.encoding.encodePrincipal('SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT');
```

### 📋 Contracts — Registry & Addresses

```typescript
import sdk from '@earnwithalee/stx-contract';

// Get all registered contract addresses
const contracts = sdk.contracts.getContractAddresses();
console.log(contracts);
// { 'builder-rewards-v3': 'SP2F...', 'checkin-rewards': 'SP2F...', ... }

// Access deployer address
console.log('Deployer:', sdk.contracts.DEPLOYER);
```

### 🌐 Network Support

The SDK works seamlessly across all Stacks networks:

```typescript
import { StxContractClient } from '@earnwithalee/stx-contract';

// Mainnet
const mainnet = new StxContractClient({ network: 'mainnet' });

// Testnet
const testnet = new StxContractClient({ network: 'testnet' });

// Local Devnet
const devnet = new StxContractClient({ network: 'devnet' });
```

### Framework Integration

**Next.js / React:**

```typescript
'use client';
import sdk from '@earnwithalee/stx-contract';
import { useState, useEffect } from 'react';

export function BalanceDisplay({ address }: { address: string }) {
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    sdk.api.getBalance(address).then(data => {
      setBalance(data.stx.toString());
    });
  }, [address]);

  return <div>{balance ? `${balance} STX` : 'Loading...'}</div>;
}
```

**Vite:**

```typescript
import sdk from '@earnwithalee/stx-contract';

const app = document.getElementById('app')!;
const balance = await sdk.api.getBalance('SP2F...');
app.innerHTML = `<h1>${balance.stx} STX</h1>`;
```

---

## 🗂️ Contract Collections

| Collection | Description | Count |
|:-----------|:------------|:------|
| **simple-contracts/** | Production-ready simple contracts | 20 |
| **10-contracts/** | Advanced DeFi and governance contracts | 10 |
| **28-contracts/** | Extended contract suite | 28 |
| **final-push/** | Bitcoin-native & reputation contracts | 6+ |

### Simple Contracts
- Message Board • Profile Registry • Voting Polls • Todo Lists • Counters • And 15 more...

### Advanced Contracts
- DAO Treasury • Multi-sig Vault • NFT Marketplace • Staking Pools • Time-locked Savings

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/Earnwithalee7890/stx-contract-deployment-hiro.git
cd stx-contract-deployment-hiro

# Install dependencies (includes @earnwithalee/stx-contract)
npm install

# Run the dashboard
npm run dev

# Run tests
npm test

# Check contracts
clarinet check
```

---

## 🎯 Built for Stacks Talent Event (April 2026)

This project is built for the **Stacks Builder Rewards** program, focusing on **Advanced Bitcoin Narrative** and **Deep Clarity Integration**.

### 📊 Activity Tracking

| Signal | Tool |
|:-------|:-----|
| Smart Contract Deployment | Clarinet + Hiro Platform |
| Library Usage | `@stacks/connect`, `@stacks/transactions`, `@earnwithalee/stx-contract` |
| GitHub Contributions | Regular commits, CI/CD, documentation |
| SDK Infrastructure | Published & maintained NPM package |

### How to Get Started

1. **Create Your Bitcoin L2 Wallet** — Connect on [talent.app](https://talent.app)
2. **Connect Your GitHub Profile** — Link in talent.app settings
3. **Install the SDK** — `npm install @earnwithalee/stx-contract`
4. **Start Building** — Deploy contracts and build dApps!

📖 **[Read April 2026 Documentation →](APRIL_Ecosystem_Update.md)**

---

## 🚀 April 2026 — Deployment Phase

| Contract Name | Status | Category |
|:---|:---|:---|
| **talent-event-registry** | Pending | Event |
| **impact-rewards** | Pending | Analytics |
| **event-milestone-tracker** | Pending | Tracking |
| **stacks-rank-helper** | Pending | Ranking |
| **reputation-v2** | Pending | Reputation |
| **community-voting-v3** | Pending | Governance |

All contracts optimized for deployment and tested on Stacks mainnet.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © [earnwithalee](https://github.com/Earnwithalee7890)
