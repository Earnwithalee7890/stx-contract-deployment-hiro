// Example: Using the Message Board contract

import { makeContractCall, broadcastTransaction } from '@stacks/transactions';
import { StacksTestnet } from '@stacks/network';

const network = new StacksTestnet();

// Post a message
async function postMessage(message) {
    const txOptions = {
        contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        contractName: 'message-board',
        functionName: 'post-message',
        functionArgs: [stringUtf8CV(message)],
        network,
        senderKey: 'your-private-key',
    };

    const transaction = await makeContractCall(txOptions);
    const broadcastResponse = await broadcastTransaction(transaction, network);
    return broadcastResponse;
}

// Get a message
async function getMessage(id) {
    const result = await callReadOnlyFunction({
        contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        contractName: 'message-board',
        functionName: 'get-message',
        functionArgs: [uintCV(id)],
        network,
    });

    return result;
}

// Usage
postMessage('Hello from JavaScript!').then(console.log);
getMessage(1).then(console.log);
