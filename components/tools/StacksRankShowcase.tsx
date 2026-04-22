'use client';

import { useState, useEffect } from 'react';
// @ts-ignore - The SDK might not have types yet
import sdk from '@earnwithalee/stx-contract';

interface StacksRankShowcaseProps {
    userAddress: string;
}

export const StacksRankShowcase = ({ userAddress }: StacksRankShowcaseProps) => {
    const [balance, setBalance] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [contracts, setContracts] = useState<any[]>([]);

    useEffect(() => {
        if (userAddress) {
            loadData();
        }
        
        // Load contract addresses from SDK
        const contractData = sdk.contracts.getContractAddresses();
        const formattedContracts = Object.entries(contractData).map(([name, address]) => ({
            name,
            address
        }));
        setContracts(formattedContracts);
    }, [userAddress]);

    const loadData = async () => {
        setLoading(true);
        try {
            // Using SDK API module
            const data = await sdk.api.getBalance(userAddress);
            setBalance(data.stx.toString());
        } catch (error) {
            console.error('Error loading SDK data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card-glass" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>💎</span> StacksRank SDK Showcase
                </h3>
                <span className="badge badge-achievement">Active SDK</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '12px' }}>
                    <p style={{ margin: '0 0 0.5rem 0', opacity: 0.7, fontSize: '0.9rem' }}>Mainnet Balance</p>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--stx-gold)' }}>
                        {loading ? '---' : balance ? `${balance} STX` : 'Connect Wallet'}
                    </div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '12px' }}>
                    <p style={{ margin: '0 0 0.5rem 0', opacity: 0.7, fontSize: '0.9rem' }}>SDK Version</p>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        v1.0.0
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
                <h4 style={{ marginBottom: '1rem', opacity: 0.8 }}>Registered Ecosystem Contracts</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {contracts.map((c, i) => (
                        <div key={i} className="badge" style={{ 
                            background: 'rgba(255, 165, 0, 0.1)', 
                            border: '1px solid rgba(255, 165, 0, 0.2)',
                            fontSize: '0.8rem',
                            padding: '0.4rem 0.8rem'
                        }}>
                            {c.name}: {c.address.slice(0, 6)}...{c.address.slice(-4)}
                        </div>
                    ))}
                </div>
            </div>
            
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', borderLeft: '4px solid var(--stx-gold)' }}>
                <code style={{ fontSize: '0.85rem', color: '#ccc' }}>
                    // Powered by @earnwithalee/stx-contract<br/>
                    const data = await sdk.api.getBalance(userAddress);
                </code>
            </div>
        </div>
    );
};
