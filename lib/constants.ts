/**
 * Application constants for STX Builder Hub
 */

// Network configurations
export const STACKS_MAINNET_URL = 'https://stacks-node-api.mainnet.stacks.co';
export const STACKS_TESTNET_URL = 'https://stacks-node-api.testnet.stacks.co';

// Contract limits
export const MAX_CONTRACT_NAME_LENGTH = 128;
export const MAX_CONTRACTS_PER_BATCH = 25;
export const CONTRACT_DEPLOY_GAS_ESTIMATE = 0.5; // STX

// UI Constants
export const ITEMS_PER_PAGE = 10;
export const TOAST_DURATION_MS = 5000;
export const DEBOUNCE_MS = 300;

// Achievement thresholds
export const ACHIEVEMENT_THRESHOLDS = {
    FIRST_CONTRACT: 1,
    BRONZE_DEPLOYER: 10,
    SILVER_DEPLOYER: 50,
    GOLD_DEPLOYER: 100,
    PLATINUM_DEPLOYER: 500,
    DIAMOND_DEPLOYER: 1000,
} as const;

// Badge colors
export const BADGE_COLORS = {
    bronze: '#CD7F32',
    silver: '#C0C0C0',
    gold: '#FFD700',
    platinum: '#E5E4E2',
    diamond: '#B9F2FF',
} as const;

// API endpoints
export const API_ENDPOINTS = {
    DEPLOY_CONTRACT: '/api/deploy',
    CHECK_STATUS: '/api/status',
    GET_STATS: '/api/stats',
    CHAINHOOK: '/api/chainhook',
} as const;

// Error messages
export const ERROR_MESSAGES = {
    INVALID_ADDRESS: 'Please enter a valid Stacks wallet address',
    INVALID_CONTRACT_NAME: 'Contract name must start with lowercase letter',
    DEPLOYMENT_FAILED: 'Contract deployment failed. Please try again.',
    NETWORK_ERROR: 'Network error. Please check your connection.',
} as const;
