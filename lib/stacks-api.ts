import { StacksMainnet } from '@stacks/network';

const network = new StacksMainnet();
const API_BASE = 'https://api.mainnet.hiro.so';

export const getAccountBalance = async (address: string) => {
  const response = await fetch(`${API_BASE}/extended/v1/address/${address}/balances`);
  if (!response.ok) throw new Error('Failed to fetch balance');
  return response.json();
};

export const getContractSource = async (contractId: string) => {
  const response = await fetch(`${API_BASE}/v2/contracts/source/${contractId.split('.')[0]}/${contractId.split('.')[1]}`);
  if (!response.ok) throw new Error('Failed to fetch source');
  return response.json();
};
