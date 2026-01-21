/**
 * TypeScript type definitions for the STX Builder Hub
 */

// Contract Types
export interface Contract {
    id: string;
    name: string;
    source: string;
    deployedAt?: Date;
    status: 'pending' | 'deployed' | 'failed';
    txId?: string;
    address?: string;
}

// User Types
export interface User {
    address: string;
    displayName?: string;
    contractCount: number;
    achievements: Achievement[];
    createdAt: Date;
}

// Achievement Types
export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt?: Date;
    tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
}

// API Response Types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// Deployment Types
export interface DeploymentRequest {
    contractName: string;
    sourceCode: string;
    network: 'mainnet' | 'testnet';
}

export interface DeploymentResult {
    txId: string;
    contractAddress: string;
    status: 'pending' | 'success' | 'failed';
    gasUsed?: number;
}

// Stats Types
export interface Stats {
    totalContracts: number;
    activeUsers: number;
    deploymentToday: number;
    successRate: number;
}

// Leaderboard Types
export interface LeaderboardEntry {
    rank: number;
    address: string;
    displayName?: string;
    score: number;
    contractCount: number;
}

// Event Types
export interface BlockchainEvent {
    type: 'deploy' | 'transfer' | 'call';
    txId: string;
    timestamp: Date;
    details: Record<string, unknown>;
}
