/**
 * @packageDocumentation
 * Main dashboard view module.
 */
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
                <h1 style={{ fontSize: '2.5rem', letterSpacing: '-0.02em', fontWeight: '800' }}>Stacks Builder Rewards</h1>
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
                    Hiro Chainhook: ACTIVE (January 2026 Rewards)
                </div>
            </div>

            {/* Final Call Banner */}
            <div style={{
                background: 'linear-gradient(90deg, #ff4b4b 0%, #dc2626 100%)',
                color: 'white',
                padding: '1rem',
                borderRadius: '12px',
                marginBottom: '2rem',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(220, 38, 38, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '1.5rem' }}>🚨</span>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>FINAL CALL: Event Ends Tomorrow!</h3>
                        <p style={{ margin: '0.2rem 0 0', fontSize: '0.9rem', opacity: 0.9 }}>
                            Ensure your GitHub & Wallet are connected on Talent Protocol to qualify. Distribution: Feb 3.
                        </p>
                    </div>
                    <div style={{
                        background: 'rgba(0,0,0,0.2)',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        ⏳ <span id="countdown">24H Remaining</span>
                    </div>
                </div>
            </div>

            {/* Eligibility Checklist */}
            <div className="glass-card" style={{ marginBottom: '2rem', borderLeft: '4px solid #10b981' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>✅ Eligibility Checklist</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input type="checkbox" checked={!!userAddress} readOnly style={{ width: '1.2rem', height: '1.2rem', accentColor: '#10b981' }} />
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" rx="6" fill="#5546FF" />
                            <path d="M7 14L12 11.5L17 14V16.5L12 19L7 16.5V14Z" fill="white" />
                            <path d="M7 7.5L12 5L17 7.5V10L12 12.5L7 10V7.5Z" fill="white" />
                        </svg>
                        <span>Connect Stacks Wallet</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input type="checkbox" checked={true} readOnly style={{ width: '1.2rem', height: '1.2rem', accentColor: '#10b981' }} />
                        <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                        <span>Connect GitHub (Talent)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input type="checkbox" checked={checkInCount > 0} readOnly style={{ width: '1.2rem', height: '1.2rem', accentColor: '#10b981' }} />
                        <img src="/logo.png" width="20" height="20" alt="Project Logo" style={{ borderRadius: '4px' }} />
                        <span>Active Mainnet Check-in</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" rx="12" fill="#111827" />
                            <path d="M12 6L16 12L12 18L8 12L12 6Z" fill="#3B82F6" />
                        </svg>
                        <a href="https://talent.app/~/earn/stacks" target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', color: '#3b82f6', textDecoration: 'underline' }}>
                            Verify on Talent App ↗
                        </a>
                    </div>
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
                    <p>The Stacks Builder Rewards program is a collaboration to reward developers building the future of Bitcoin on Stacks.</p>
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
                            <strong>15,300 $STX
                                <Tooltip text="Total rewards pool for the January 2026 campaign.">
                                    <span style={{ textDecoration: 'underline dotted', cursor: 'help' }}> Rewards Pool</span>
                                </Tooltip>
                            </strong> distributed across 3 tiers
                        </li>
                        <li><strong>Activity Tracking:</strong> Jan 19 - Jan 31</li>
                        <li><strong>Distribution Date:</strong> Feb 3, 2026</li>
                        <li><strong>Wallet Integration:</strong> Leather, Xverse, Asigna, Fordefi</li>
                        <li><strong>Live Leaderboard</strong> tracking on-chain and GitHub activity</li>
                    </ul>

                    <h3 style={{ fontSize: '1rem', marginTop: '1.5rem', marginBottom: '0.8rem', color: 'var(--text)' }}>🏆 Reward Tiers:</h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem',
                        marginBottom: '1.5rem'
                    }}>
                        <div style={{ background: 'rgba(255, 215, 0, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 215, 0, 0.3)' }}>
                            <div style={{ fontWeight: 'bold', color: '#ffd700', marginBottom: '0.3rem' }}>Tier 1: Top 10</div>
                            <div style={{ fontSize: '0.85rem' }}>Share 50% of the pool equally.</div>
                        </div>
                        <div style={{ background: 'rgba(192, 192, 192, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(192, 192, 192, 0.3)' }}>
                            <div style={{ fontWeight: 'bold', color: '#c0c0c0', marginBottom: '0.3rem' }}>Tier 2: Next 15</div>
                            <div style={{ fontSize: '0.85rem' }}>Share 25% proportionally based on impact.</div>
                        </div>
                        <div style={{ background: 'rgba(205, 127, 50, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(205, 127, 50, 0.3)' }}>
                            <div style={{ fontWeight: 'bold', color: '#cd7f32', marginBottom: '0.3rem' }}>Tier 3: Next 25</div>
                            <div style={{ fontSize: '0.85rem' }}>Share 25% proportionally based on impact.</div>
                        </div>
                    </div>

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
