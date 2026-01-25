'use client';

import { useState, useCallback, useEffect } from 'react';

interface Job {
    id: number;
    title: string;
    reward: number;
    status: string;
    employer: string;
}

export function JobBoard({ userAddress, setMessage }: { userAddress: string, setMessage: (m: string) => void }) {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);

    // Mock data for initial UI demonstration
    useEffect(() => {
        setJobs([
            { id: 1, title: "Build Clarity 4 Dashboard", reward: 50, status: "OPEN", employer: "SP1..." },
            { id: 2, title: "Integrate Chainhooks", reward: 100, status: "OPEN", employer: "SP2..." }
        ]);
    }, []);

    const handlePostJob = async () => {
        if (!userAddress) {
            setMessage('❌ Please connect wallet');
            return;
        }
        setMessage('⏳ Transaction initiated...');
        // Placeholder for contract-call logic
        setTimeout(() => setMessage('✅ Job posted to blockchain (simulation)'), 1500);
    };

    return (
        <div className="glass-card" style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2>💼 Developer Job Board</h2>
                <button className="btn btn-primary" onClick={handlePostJob}>+ Post Job</button>
            </div>

            <div className="grid-jobs" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {jobs.map(job => (
                    <div key={job.id} className="glass-card job-card" style={{
                        background: 'rgba(30, 41, 59, 0.7)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '1.5rem',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: job.status === 'OPEN' ? '#10b981' : '#94a3b8' }}></div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Job #{job.id}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{job.employer}</span>
                        </div>

                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: '700', lineHeight: 1.3 }}>{job.title}</h3>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    color: '#34d399',
                                    fontWeight: 'bold',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '20px',
                                    fontSize: '0.9rem'
                                }}>
                                    {job.reward} STX
                                </span>
                            </div>
                            <span style={{
                                padding: '4px 10px',
                                background: job.status === 'OPEN' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(148, 163, 184, 0.1)',
                                color: job.status === 'OPEN' ? '#60a5fa' : '#94a3b8',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                border: `1px solid ${job.status === 'OPEN' ? 'rgba(59, 130, 246, 0.3)' : 'transparent'}`
                            }}>{job.status}</span>
                        </div>

                        <button
                            className="btn btn-primary"
                            style={{ width: '100%', marginTop: '1.5rem', fontSize: '0.95rem' }}
                            disabled={job.status !== 'OPEN'}
                        >
                            {job.status === 'OPEN' ? 'Apply Now' : 'Closed'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
