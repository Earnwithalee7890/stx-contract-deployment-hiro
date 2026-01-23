# Deployment Guide

## Prerequisites

- Clarinet CLI installed
- Stacks wallet with STX for gas fees
- Network configuration (testnet/mainnet)

## Testnet Deployment

### 1. Configure Network

Create or edit `settings/Testnet.toml`:

```toml
[network]
name = "testnet"
```

### 2. Check Contracts

```bash
clarinet check
```

### 3. Deploy Single Contract

```bash
clarinet deploy --testnet message-board
```

### 4. Deploy All Contracts

```bash
clarinet deploy --testnet
```

## Mainnet Deployment

⚠️ **WARNING**: Deploying to mainnet costs real STX and contracts are immutable!

### 1. Final Testing

```bash
# Run all checks
clarinet check

# Verify gas costs
clarinet costs
```

### 2. Deploy

```bash
clarinet deploy --mainnet contract-name
```

## Post-Deployment

1. Verify contract on explorer
2. Test all public functions
3. Document contract address
4. Update frontend integration

## Troubleshooting

### "Failed to broadcast"
- Check wallet balance
- Verify network connection
- Ensure contract syntax is valid

### "Contract already exists"
- Contract names must be unique per deployer
- Deploy with different account or rename contract
