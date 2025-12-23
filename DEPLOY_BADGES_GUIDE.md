# 🚀 Deploy Weekly Badges Contract - Simple Guide

## Method 1: Using Leather Wallet (Easiest - No Code!)

### Step 1: Get Your Private Key
1. Open **Leather Wallet** extension
2. Click **Settings** ⚙️
3. Click **"View Secret Key"**
4. **Copy your 24-word seed phrase** OR private key

### Step 2: Use Clarinet (Command Line)
```bash
# Install Clarinet (if not installed)
npm install -g @hirosystems/clarinet-cli

# Deploy the contract
clarinet contracts deploy weekly-badges --mainnet
```

It will ask for your private key, paste it, and confirm!

---

## Method 2: Manual Deployment via Script

### Step 1: Get Your Private Key from Seed Phrase
You need to convert your 24-word seed to a private key.

**Safe Method:**
1. Go to: https://leather.io/
2. Use their key derivation tool (offline mode)
3. Enter your 24 words
4. Copy the private key (starts with a long hex string)

### Step 2: Update Deployment Script
Open `scripts/deploy-badges.ts` and replace:
```typescript
const PRIVATE_KEY = 'YOUR_PRIVATE_KEY_HERE';
```

With your actual private key (keep it secret!).

### Step 3: Run Deployment
```bash
npx ts-node scripts/deploy-badges.ts
```

---

## Method 3: Hiro Platform (Web UI)

Since you can't paste directly, use their **File Upload** feature:

1. **Go to:** https://platform.hiro.so/deploy
2. **Click:** "Upload Contract File" or "Import from GitHub"
3. **Select:** `contracts/weekly-badges.clar` from your computer
4. **Contract Name:** `weekly-badges`
5. **Network:** Mainnet
6. **Click Deploy** → Approve in Leather wallet

---

## Method 4: Local Clarinet Deployment

```bash
# From your project root
cd "f:\STX CONTRACT\stacks-builder-challenge"

# Deploy using Clarinet
clarinet contracts deploy weekly-badges --mainnet
```

Follow the prompts to connect your wallet.

---

## ⚠️ SECURITY WARNING

**NEVER share your private key with anyone!**
- Delete it from the script after deployment
- Don't commit it to GitHub
- Use environment variables if possible

---

## 📋 After Successful Deployment

You'll get an address like:
```
SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.weekly-badges
```

**Give this address to your developer!** They'll update the UI to use it.

---

## 🆘 Need Help?

If none of these work, we can:
1. Use a deployment service
2. Build a custom deployment flow
3. Use Remix-like interface

Just let me know which method you want to try first! 🎯
