import { makeContractDeploy, broadcastTransaction, AnchorMode } from '@stacks/transactions';
import { StacksMainnet } from '@stacks/network';
import * as fs from 'fs';
import * as path from 'path';

// Your wallet's private key (KEEP THIS SECRET!)
const PRIVATE_KEY = 'YOUR_PRIVATE_KEY_HERE';

async function deployBadgesContract() {
    try {
        console.log('🚀 Starting weekly-badges contract deployment...\n');

        // Read the contract file
        const contractPath = path.join(__dirname, '../contracts/weekly-badges.clar');
        const contractSource = fs.readFileSync(contractPath, 'utf8');

        console.log(`📄 Contract loaded: ${contractPath}`);
        console.log(`📝 Contract size: ${contractSource.length} characters\n`);

        // Configure network
        const network = new StacksMainnet();

        // Create deployment transaction
        const txOptions = {
            contractName: 'weekly-badges',
            codeBody: contractSource,
            senderKey: PRIVATE_KEY,
            network,
            anchorMode: AnchorMode.Any,
            fee: 50000, // 0.05 STX fee
        };

        console.log('📦 Creating deployment transaction...');
        const transaction = await makeContractDeploy(txOptions);

        console.log('📡 Broadcasting to Stacks mainnet...\n');
        const broadcastResponse = await broadcastTransaction(transaction, network);

        console.log('✅ DEPLOYMENT SUCCESSFUL!\n');
        console.log('Transaction ID:', broadcastResponse.txid);
        console.log(`\n🔍 View on Explorer:`);
        console.log(`https://explorer.hiro.so/txid/${broadcastResponse.txid}?chain=mainnet\n`);

        console.log('⏳ Waiting for confirmation (usually 30-60 seconds)...');
        console.log('📋 Your contract will be available at:');
        console.log(`   YOUR_ADDRESS.weekly-badges\n`);

    } catch (error) {
        console.error('❌ Deployment failed:', error);
        process.exit(1);
    }
}

// Run deployment
deployBadgesContract();
