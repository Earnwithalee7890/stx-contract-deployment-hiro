declare module '@earnwithalee/stx-contract' {
    export interface StxContractClientOptions {
        network: 'mainnet' | 'testnet' | 'devnet';
    }

    export class StxContractClient {
        constructor(options: StxContractClientOptions);
        network: string;
    }

    export const encoding: {
        encodeStringAscii: (str: string) => string;
        encodeStringUtf8: (str: string) => string;
        encodeUint: (val: number | bigint) => string;
        encodeInt: (val: number | bigint) => string;
        encodeBool: (val: boolean) => string;
        encodePrincipal: (address: string) => string;
        encodeBuffer: (buffer: Buffer | Uint8Array) => string;
    };
    export const contracts: {
        CONTRACTS: Record<string, string>;
        DEPLOYER: string;
        getContractAddresses: () => Record<string, string>;
    };
    export const wallet: {
        detectWallet: () => { available: boolean; provider: string | null };
        connectWallet: () => Promise<string>;
        callContract: (options: any) => Promise<any>;
        formatAddress: (address: string, start?: number, end?: number) => string;
    };
    export const api: {
        getBalance: (address: string) => Promise<{ stx: number; microstx: string }>;
        getTransactions: (address: string) => Promise<any[]>;
        getTransactionStatus: (txId: string) => Promise<string>;
        readContract: (options: any) => Promise<any>;
        getBlockHeight: () => Promise<number>;
    };
    
    // Top-level exports
    export const encodeStringAscii: typeof encoding.encodeStringAscii;
    export const connectWallet: typeof wallet.connectWallet;
    export const getBalance: typeof api.getBalance;
    
    const sdk: {
        encoding: typeof encoding;
        contracts: typeof contracts;
        wallet: typeof wallet;
        api: typeof api;
    };
    export default sdk;
}
