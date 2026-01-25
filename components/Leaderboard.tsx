'use client';

import { useState, useEffect } from 'react';
import { Skeleton } from './Skeleton';

interface LeaderboardEntry {
    address: string;
    contracts: number;
    score: number;
    rank: number;
}

/**
 * Leaderboard component to display top Stacks builders.
 */
export function Leaderboard() {
    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data for leaderboard
        const mockEntries: LeaderboardEntry[] = [
            { address: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT', contracts: 102, score: 980, rank: 1 },
            { address: 'SP3X2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9', contracts: 45, score: 850, rank: 2 },
            { address: 'SP1PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9', contracts: 32, score: 720, rank: 3 },
            { address: 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9', contracts: 28, score: 650, rank: 4 },
            { address: 'SP3X6PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9', contracts: 15, score: 420, rank: 5 },
        ];

        setTimeout(() => {
            setEntries(mockEntries);
            setLoading(false);
        }, 800);
    }, []);

    return (
        <div className="glass-card leaderboard-card">
            <div className="card-header">
                <h2>🏆 Top Builders</h2>
                <div className="badge-impact">Live Impact</div>
            </div>

            <div className="leaderboard-table">
                <div className="table-header">
                    <span>Rank</span>
                    <span>Builder</span>
                    <span>Contracts</span>
                    <span>Score</span>
                </div>

                {loading ? (
                    <div className="skeleton-list">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="table-row">
                                <Skeleton width="24px" height="24px" borderRadius="12px" />
                                <Skeleton width="120px" height="1rem" />
                                <Skeleton width="40px" height="1rem" />
                                <Skeleton width="60px" height="1.5rem" borderRadius="8px" />
                            </div>
                        ))}
                    </div>
                ) : (
                    entries.map((entry) => (
                        <div key={entry.address}
                            className={`table-row rank-${entry.rank}`}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 3fr 1fr 1fr',
                                padding: '1rem',
                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                                alignItems: 'center',
                                background: entry.rank % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                                transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = entry.rank % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent'}
                        >
                            <div className="rank" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                                {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : <span style={{ color: '#94a3b8', marginLeft: '0.5rem' }}>#{entry.rank}</span>}
                            </div>
                            <div className="address" style={{ fontFamily: 'monospace', color: '#cbd5e1' }}>
                                {entry.address.slice(0, 6)}...{entry.address.slice(-4)}
                                <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', color: '#10b981' }}>▲</span>
                            </div>
                            <div className="contracts" style={{ textAlign: 'center', fontWeight: '600' }}>{entry.contracts}</div>
                            <div className="score-badge" style={{
                                textAlign: 'right',
                                background: `rgba(${99 + entry.rank * 10}, 102, 241, 0.15)`,
                                padding: '0.25rem 0.5rem',
                                borderRadius: '8px',
                                color: '#a5b4fc',
                                width: 'fit-content',
                                justifySelf: 'end'
                            }}>
                                {entry.score} XP
                            </div>
                        </div>
                    ))
                )}
            </div>

            <button className="btn-view-all">View Full Rankings</button>
        </div>
    );
}
