'use client';

import { useState } from 'react';
import { useToast } from '@/components/AchievementSystem';

export function StacksDashboard({ userAddress }: { userAddress: string }) {
    const { addToast } = useToast();
    const [swapAmount, setSwapAmount] = useState('10');
    const [isSwapping, setIsSwapping] = useState(false);

    const coins = [
        { name: 'Stacks', symbol: 'STX', balance: '1,250.50', icon: '🚀' },
        { name: 'USD Coin', symbol: 'USDC', balance: '500.00', icon: '💵' },
        { name: 'Bitcoin', symbol: 'BTC', balance: '0.045', icon: '₿' },
        { name: 'ALEX', symbol: 'ALEX', balance: '10,000', icon: '💎' },
        { name: 'CityCoins', symbol: 'MIA', balance: '50,000', icon: '🏙️' },
    ];

    const handleSwap = () => {
        setIsSwapping(true);
        setTimeout(() => {
            setIsSwapping(false);
            addToast('Swap Complete!', `Swapped ${swapAmount} STX for USDC successfully.`, 'success');
        }, 1500);
    };

    return (
        <div className="glass-card" style={{ padding: '2rem', marginTop: '2rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <span className="icon-pulse">💰</span> Stacks Asset Hub
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {coins.map((coin) => (
                    <div key={coin.symbol} className="stat-card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{coin.icon}</div>
                        <div style={{ opacity: 0.7, fontSize: '0.8rem' }}>{coin.name}</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{coin.balance} {coin.symbol}</div>
                    </div>
                ))}
            </div>

            <div className="glass-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem' }}>
                <h4>🔄 Quick Swap</h4>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginTop: '1rem' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '0.8rem', opacity: 0.7 }}>Sell STX</label>
                        <input
                            type="number"
                            value={swapAmount}
                            onChange={(e) => setSwapAmount(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                        />
                    </div>
                    <div style={{ fontSize: '1.5rem' }}>➡️</div>
                    <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '0.8rem', opacity: 0.7 }}>Buy USDC</label>
                        <div style={{ padding: '0.5rem', borderRadius: '4px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            {(Number(swapAmount) * 2.5).toFixed(2)} USDC
                        </div>
                    </div>
                    <button
                        onClick={handleSwap}
                        disabled={isSwapping}
                        className="btn-primary"
                        style={{ padding: '0.6rem 1.5rem' }}
                    >
                        {isSwapping ? 'Swapping...' : 'Swap Now'}
                    </button>
                </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h4>📊 Market Activity</h4>
                <div style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '1rem' }}>
                    <p>• Connected to Stacks Mainnet</p>
                    <p>• L2 Speed: Ultra Fast (Nakamoto Activated)</p>
                    <p>• Recent BTC Settlement: Block #845,921</p>
                </div>
            </div>
        </div>
    );
}
