'use client';

import { memo } from 'react';

/**
 * Visual Roadmap component showing project milestones.
 */
export const Roadmap = memo(function Roadmap() {
    const milestones = [
        { phase: 'Phase 1', title: 'Genesis', status: 'completed', description: 'Core smart contract deployment and basic dashboard.' },
        { phase: 'Phase 2', title: 'Expansion', status: 'completed', description: 'Hiro Chainhooks integration and live activity feed.' },
        { phase: 'Phase 3', title: 'Utility', status: 'current', description: 'Advanced builder tools, 20+ features, and premium UI redesign.' },
        { phase: 'Phase 4', title: 'Governance', status: 'upcoming', description: 'DAO voting system and community-led rewards.' },
    ];

    return (
        <div className="glass-card roadmap-card" style={{ position: 'relative', overflow: 'hidden' }}>
            <h2 style={{ marginBottom: '2rem' }}>🗺️ Project Roadmap</h2>
            <div className="roadmap-timeline" style={{ position: 'relative', paddingLeft: '1rem' }}>
                {/* Vertical Line */}
                <div style={{
                    position: 'absolute',
                    left: '29px',
                    top: '20px',
                    bottom: '40px',
                    width: '2px',
                    background: 'linear-gradient(to bottom, #6366f1 0%, rgba(99, 102, 241, 0.1) 100%)'
                }}></div>

                {milestones.map((m, i) => (
                    <div key={i} className={`roadmap-item ${m.status}`} style={{
                        display: 'flex',
                        gap: '1.5rem',
                        marginBottom: '2rem',
                        opacity: m.status === 'upcoming' ? 0.6 : 1,
                        position: 'relative'
                    }}>
                        <div className="roadmap-point" style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: m.status === 'completed' ? '#10b981' : m.status === 'current' ? '#6366f1' : '#1e293b',
                            border: `4px solid ${m.status === 'current' ? 'rgba(99, 102, 241, 0.3)' : '#0f172a'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2,
                            boxShadow: m.status === 'current' ? '0 0 20px rgba(99, 102, 241, 0.5)' : 'none',
                            flexShrink: 0
                        }}>
                            {m.status === 'completed' ? '✓' : i + 1}
                        </div>
                        <div className="roadmap-content" style={{
                            flex: 1,
                            background: m.status === 'current' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                            border: `1px solid ${m.status === 'current' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.05)'}`,
                            padding: '1.25rem',
                            borderRadius: '16px',
                            transform: m.status === 'current' ? 'scale(1.02)' : 'none',
                            transition: 'all 0.3s ease'
                        }}>
                            <div className="roadmap-meta" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span className="phase-tag" style={{
                                    textTransform: 'uppercase',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    color: m.status === 'current' ? '#818cf8' : '#94a3b8'
                                }}>{m.phase}</span>
                                <span className={`status-tag ${m.status}`} style={{
                                    fontSize: '0.7rem',
                                    padding: '2px 8px',
                                    borderRadius: '10px',
                                    background: m.status === 'current' ? '#6366f1' : 'rgba(255,255,255,0.1)',
                                    color: '#fff'
                                }}>{m.status}</span>
                            </div>
                            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{m.title}</h3>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.5' }}>{m.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});
