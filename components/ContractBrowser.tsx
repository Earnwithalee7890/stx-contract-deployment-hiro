'use client';

/**
 * Featured Contract Browser component.
 */
export function ContractBrowser() {
    const featuredContracts = [
        { name: 'builder-reputation-nft', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.builder-reputation-nft', description: 'Soulbound Token (SBT) for tracking builder reputation on Stacks.' },
        { name: 'impact-dao-voting', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.impact-dao-voting', description: 'Decentralized voting mechanism for impact proposals.' },
        { name: 'community-badges', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.community-badges', description: 'Mintable badges for community participation and events.' },
        { name: 'content-tipping', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.content-tipping', description: 'Direct peer-to-peer tipping protocol for content creators.' },
        { name: 'status-update-feed', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.status-update-feed', description: 'On-chain micro-blogging and status updates.' },
        { name: 'social-graph-registry', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.social-graph-registry', description: 'Mapping user identities to on-chain profiles.' },
        { name: 'nft-marketplace-v1', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.nft-marketplace-v1', description: 'Marketplace logic for listing and buying NFTs.' },
        { name: 'governance-token', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.governance-token', description: 'Standard SIP-010 governance token implementation.' },
        { name: 'lottery-game', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.lottery-game', description: 'Provably fair on-chain lottery game.' },
        { name: 'milestone-escrow', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.milestone-escrow', description: 'Escrow service with milestone-based fund release.' },
        { name: 'defi-swap-basic', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.defi-swap-basic', description: 'Educational AMM-style token swap contract.' },
        { name: 'final-event-memorial', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.final-event-memorial', description: 'Commemorative contract for the January 2026 event finale.' },
        { name: 'batch-nft-1', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.batch-nft-1', description: 'High-performance NFT collection from 30-contract batch.' },
        { name: 'batch-vault-2', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.batch-vault-2', description: 'Secure vault system for asset management.' },
        { name: 'batch-dao-3', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.batch-dao-3', description: 'Community governance and proposal engine.' },
        { name: 'batch-dex-4', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.batch-dex-4', description: 'Automated market maker for token swaps.' },
        { name: 'batch-oracle-5', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.batch-oracle-5', description: 'On-chain price oracle for DeFi applications.' },
        { name: 'batch-escrow-6', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.batch-escrow-6', description: 'Milestone-based escrow service for builders.' },
        { name: 'batch-staking-7', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.batch-staking-7', description: 'Yield-bearing staking protocol for STX.' },
        { name: 'batch-gov-token-8', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.batch-gov-token-8', description: 'SIP-010 governance token for ecosystem voting.' },
        { name: 'batch-bridge-9', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.batch-bridge-9', description: 'Cross-chain bridge for Stacks assets.' },
        { name: 'batch-marketplace-10', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.batch-marketplace-10', description: 'Full-featured NFT marketplace contract.' },
        { name: 'batch-contracts-11-30', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.batch-30-library', description: 'A library of 20 additional utility and DeFi contracts.' },
    ];

    return (
        <div className="glass-card contract-browser-card">
            <h2>🔍 Featured Contracts</h2>
            <div className="contract-grid">
                {featuredContracts.map((c, i) => (
                    <div key={i} className="contract-item">
                        <div className="contract-info">
                            <span className="contract-name">{c.name}</span>
                            <span className="contract-addr">{c.address.slice(0, 10)}...</span>
                        </div>
                        <p className="contract-desc">{c.description}</p>
                        <a
                            href={`https://explorer.hiro.so/contract/${c.address}?chain=mainnet`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-inspect"
                        >
                            Inspect Code ↗️
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
