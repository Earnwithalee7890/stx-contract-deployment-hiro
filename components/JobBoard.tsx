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

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                {jobs.map(job => (
                    <div key={job.id} className="glass-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>ID: #{job.id}</div>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{job.title}</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#10b981', fontWeight: 'bold' }}>💰 {job.reward} STX</span>
                            <span style={{
                                padding: '4px 8px',
                                background: 'rgba(59, 130, 246, 0.2)',
                                color: '#3b82f6',
                                borderRadius: '4px',
                                fontSize: '0.8rem'
                            }}>{job.status}</span>
                        </div>
                        <button
                            className="btn btn-primary"
                            style={{ width: '100%', marginTop: '1rem', fontSize: '0.9rem' }}
                            disabled={job.status !== 'OPEN'}
                        >
                            Apply Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
