import { useState } from 'react';
import { Modal } from '../Modal';
import { Tooltip } from '../Tooltip';
import { Leaderboard } from '../Leaderboard';
import { Roadmap } from '../Roadmap';
import { FAQ } from '../FAQ';
import { GasEstimator } from '../GasEstimator';
import { ContractBrowser } from '../ContractBrowser';
import { UserSettings } from '../UserSettings';
import { FeedbackForm } from '../FeedbackForm';
import { CheckInFeed } from '../CheckInFeed';

interface DashboardViewProps {
    userAddress: string;
    checkInCount: number;
    loading: boolean;
    message: string;
    handleCheckIn: () => void;
    handleClaimReward: () => void;
    handleClaimCheckinRewards: () => void;
}

/**
 * Main dashboard view containing stats, leaderboard, and daily actions.
 */
export const DashboardView = ({
    userAddress,
    checkInCount,
    loading,
    message,
    handleCheckIn,
    handleClaimReward,
    handleClaimCheckinRewards
}: DashboardViewProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="content-animate">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem' }}>STX Builder Hub</h1>
                <p style={{ color: 'var(--text-muted)' }}>Check-in daily, deploy contracts, and track activity</p>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(255, 75, 75, 0.1)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 75, 75, 0.2)',
                    fontSize: '0.8rem',
                    color: '#ff4b4b',
                    marginTop: '1rem'
                }}>
                    <span className="pulse-dot" style={{ width: '6px', height: '6px', background: '#ff4b4b', borderRadius: '50%' }}></span>
                    Hiro Chainhook: ACTIVE (January Rewards v3)
                </div>
            </div>

            {/* Week 3 Builder Challenge Section */}
            <div className="glass-card" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{
                            background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            fontWeight: 'bold',
                            color: 'white',
                            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
                        }}>
                            🔥 JANUARY BUILDER CHALLENGE
                        </span>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            Impact: <strong>100%</strong> | Jan 19 - Jan 31
                        </div>
                    </div>
                    <div style={{
                        background: 'linear-gradient(135deg, #ff4b4b 0%, #ff8c42 100%)',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 'bold',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(255, 75, 75, 0.3)',
                        alignSelf: 'flex-start'
                    }}>
                        🏆 STACKS JANUARY EVENT LIVE
                    </div>
                </div>

                <div className="search-container" style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <div className="search-wrapper" style={{ flex: 1 }}>
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Search contracts, features, or builders..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="premium-search-input"
                            />
                            {searchQuery && (
                                <button className="search-clear" onClick={() => setSearchQuery('')}>&times;</button>
                            )}
                        </div>
                        <button className="btn" onClick={() => setIsModalOpen(true)} style={{ whiteSpace: 'nowrap' }}>
                            📜 View Manifest
                        </button>
                    </div>
                </div>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="📜 Builder Manifest">
                    <p>The STX Builder Hub is more than a dashboard. It's a commitment to the Stacks ecosystem.</p>
                    <ul style={{ paddingLeft: '1.2rem', marginTop: '1rem' }}>
                        <li><strong>Decentralization:</strong> We prioritize on-chain transparency.</li>
                        <li><strong>Open Source:</strong> All contracts and code are available for inspection.</li>
                        <li><strong>Builder First:</strong> Designed to provide the best DX for Stacks developers.</li>
                        <li><strong>Impact:</strong> Every transaction contributes to network growth.</li>
                    </ul>
                    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        <button className="btn btn-primary" onClick={() => setIsModalOpen(false)}>I am a Builder 🚀</button>
                    </div>
                </Modal>

                <h2 style={{ marginTop: '1rem', marginBottom: '1rem', fontSize: '1.3rem' }}>🧱 Built on Stacks</h2>

                <div style={{ textAlign: 'left', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                    <p style={{ marginBottom: '1rem' }}>
                        This platform is built during the Stacks Builder Challenge, demonstrating real Stacks mainnet integration with Clarity smart contracts and Hiro Chainhooks.
                    </p>

                    <h3 style={{ fontSize: '1rem', marginTop: '1.5rem', marginBottom: '0.8rem', color: 'var(--text)' }}>✅ What's Built:</h3>
                    <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                        <li>
                            <strong>100+
                                <Tooltip text="Clarity is a decidable language for smart contracts on the Stacks blockchain.">
                                    <span style={{ textDecoration: 'underline dotted', cursor: 'help' }}> Clarity Smart Contracts</span>
                                </Tooltip>
                            </strong> deployed to Stacks mainnet
                        </li>
                        <li><strong>Hiro Chainhooks Integration</strong> monitoring builder-rewards-v3 contract in real-time</li>
                        <li><strong>Mainnet Check-In System</strong> with fee collection (0.1 STX)</li>
                        <li><strong>Wallet Connection</strong> using Stacks Connect & Leather Wallet</li>
                        <li><strong>January Builder Rewards</strong> impact tracking active</li>
                        <li><strong>Live Activity Feed</strong> tracking on-chain events</li>
                    </ul>

                    <h3 style={{ fontSize: '1rem', marginTop: '1.5rem', marginBottom: '0.8rem', color: 'var(--text)' }}>🔗 Proof of Work:</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '1rem' }}>
                        <a
                            href="https://github.com/Earnwithalee7890/stx-daily-check-in"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                background: 'var(--input-bg)',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                color: '#10b981',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                fontSize: '0.9rem',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            📂 GitHub Repository
                        </a>
                        <a
                            href="https://explorer.hiro.so/address/SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT?chain=mainnet"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                background: 'var(--input-bg)',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                color: '#ff4b4b',
                                border: '1px solid rgba(255, 75, 75, 0.3)',
                                fontSize: '0.9rem',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            🔍 Deployed Contracts
                        </a>
                        <a
                            href="https://github.com/Earnwithalee7890/stx-daily-check-in/blob/main/chainhooks/builder-rewards-v3.json"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                background: 'var(--input-bg)',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                color: '#fbbf24',
                                border: '1px solid rgba(251, 191, 36, 0.3)',
                                fontSize: '0.9rem',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            🪝 Chainhook Config
                        </a>
                    </div>

                    <h3 style={{ fontSize: '1rem', marginTop: '1.5rem', marginBottom: '0.8rem', color: 'var(--text)' }}>📝 Build Log:</h3>
                    <div style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        padding: '1rem',
                        borderRadius: '8px',
                        borderLeft: '3px solid #ff4b4b',
                        fontFamily: 'monospace',
                        fontSize: '0.85rem'
                    }}>
                        <div style={{ marginBottom: '0.5rem' }}>✅ Week 1: Deployed 75 Clarity contracts to mainnet</div>
                        <div style={{ marginBottom: '0.5rem' }}>✅ Week 2: Integrated Hiro Chainhooks for real-time monitoring</div>
                        <div style={{ marginBottom: '0.5rem' }}>✅ Week 2: Built check-in system with fee collection mechanism</div>
                        <div style={{ marginBottom: '0.5rem' }}>✅ Week 3: Added contract deployer with NFT minting capability</div>
                        <div>✅ Week 3: Implemented live activity feed and wallet integration</div>
                    </div>
                </div>
            </div>

            {userAddress && (
                <>
                    <div className="stats-grid">
                        <div className="glass-card premium-stat-card">
                            <div className="stat-icon-wrapper">📅</div>
                            <div className="stat-text">
                                <div className="stat-label">Total Check-Ins</div>
                                <div className="stat-value">{checkInCount}</div>
                            </div>
                            <div className="mini-chart">
                                <div className="bar" style={{ height: '40%' }}></div>
                                <div className="bar" style={{ height: '60%' }}></div>
                                <div className="bar" style={{ height: '30%' }}></div>
                                <div className="bar" style={{ height: '80%' }}></div>
                                <div className="bar active" style={{ height: '50%' }}></div>
                            </div>
                        </div>

                        <div className="glass-card premium-stat-card gold-tint">
                            <div className="stat-icon-wrapper">💰</div>
                            <div className="stat-text">
                                <div className="stat-label">STX Claimed</div>
                                <div className="stat-value">0.0</div>
                            </div>
                            <div className="mini-chart">
                                <div className="bar" style={{ height: '20%' }}></div>
                                <div className="bar" style={{ height: '30%' }}></div>
                                <div className="bar" style={{ height: '25%' }}></div>
                                <div className="bar" style={{ height: '40%' }}></div>
                                <div className="bar active" style={{ height: '10%' }}></div>
                            </div>
                        </div>

                        <div className="glass-card premium-stat-card pulse-tint">
                            <div className="stat-icon-wrapper">⚡</div>
                            <div className="stat-text">
                                <div className="stat-label">Builder Score</div>
                                <div className="stat-value">98<span className="unit">/100</span></div>
                            </div>
                            <div className="mini-chart">
                                <div className="bar" style={{ height: '70%' }}></div>
                                <div className="bar" style={{ height: '85%' }}></div>
                                <div className="bar" style={{ height: '90%' }}></div>
                                <div className="bar" style={{ height: '95%' }}></div>
                                <div className="bar active" style={{ height: '98%' }}></div>
                            </div>
                        </div>
                    </div>

                    <Leaderboard />

                    <div className="glass-card" style={{ marginTop: '2rem', background: 'var(--card-bg)', border: '1px solid var(--glass-border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '1.5rem' }}>🤖</span>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', color: 'var(--text)' }}>AI Builder Insights</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
                                    Tip: Your check-in frequency is in the top 5%. Consider proposing a DAO reward increase to benefit other active builders!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ marginTop: '2rem' }}>
                        <h2>🎯 Daily Actions</h2>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                            <button
                                className="btn btn-primary"
                                onClick={handleCheckIn}
                                disabled={loading}
                            >
                                {loading ? <span className="loading"></span> : '📝'} Daily Check-In (0.1 STX)
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleClaimReward}
                                disabled={loading}
                                style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                            >
                                {loading ? <span className="loading"></span> : '🎁'} Claim 0.1 STX Reward (One-Time Bonus!)
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleClaimCheckinRewards}
                                disabled={loading}
                                style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}
                            >
                                {loading ? <span className="loading"></span> : '🏆'} Claim Check-in Points
                            </button>
                        </div>
                        {message && (
                            <div className={message.includes('✅') ? 'success-message' : 'error-message'}>
                                {message}
                            </div>
                        )}
                    </div>

                    <Roadmap />

                    <FAQ />

                    <GasEstimator />

                    <ContractBrowser />

                    <UserSettings />

                    <FeedbackForm />

                    <CheckInFeed />
                </>
            )}

            {!userAddress && <div className="content-animate"><CheckInFeed /></div>}
        </div>
    );
};
