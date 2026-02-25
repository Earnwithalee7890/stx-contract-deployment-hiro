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
        { name: 'splitter-1', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.splitter-1', description: 'Advanced revenue and fund splitting protocol.' },
        { name: 'notificationss', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.notificationss', description: 'On-chain notification and event signaling system.' },
        { name: 'nft-main', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.nft-main', description: 'Primary NFT collection for community assets.' },
        { name: 'messageww', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.messageww', description: 'Decentralized messaging and bulletin board.' },
        { name: 'math-v22', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.math-v22', description: 'Secure math library for DeFi calculations.' },
        { name: 'lottery-machine', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.lottery-machine', description: 'Autonomous on-chain lottery engine.' },
        { name: 'lock-machince', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.lock-machince', description: 'Time-locked asset security system.' },
        { name: 'batch-leading', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.batch-leading', description: 'Optimized lending and borrowing protocol.' },
        { name: 'gurd', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.gurd', description: 'Protocol-level access control and guard.' },
        { name: 'time-google', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.time-google', description: 'Oracle-synced timestamp management.' },
        { name: 'batch-v221', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.batch-v221', description: 'Aggregated asset management V2.' },
        { name: 'market-v0', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.market-v0', description: 'Phase 0 marketplace foundational contract.' },
        { name: 'governance-v4', address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT.governance-v4', description: 'Advanced DAO governance and voting system.' },
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
