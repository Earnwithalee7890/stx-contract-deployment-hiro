/**
 * @packageDocumentation
 * Admin panel view for contract management.
 */
import { useState, useEffect } from 'react';
import { useToast } from '@/components/AchievementSystem';

interface AdminPanelViewProps {
    userAddress: string;
}

/**
 * Protected view for the contract owner to manage funds and settings.
 * Only visible to specific admin addresses.
 */
export const AdminPanelView = ({ userAddress }: AdminPanelViewProps) => {
    const { addToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [feesCollected, setFeesCollected] = useState(0);
    const [contractBalance, setContractBalance] = useState(0);

    const CONTRACT_ADDRESS = 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT';
    const CONTRACT_NAME = 'builder-rewards-v3';

    // Mock data fetching for now
    useEffect(() => {
        const fetchContractData = async () => {
            // In a real app, query Stacks Node API
            setFeesCollected(8.5); // Mock
            setContractBalance(100.2); // Mock
        };
        fetchContractData();
    }, []);

    const handleWithdrawFees = async () => {
        setLoading(true);
        try {
            const { openContractCall } = await import('@stacks/connect');
            const { AnchorMode, PostConditionMode } = await import('@stacks/transactions');

            await openContractCall({
                contractAddress: CONTRACT_ADDRESS,
                contractName: CONTRACT_NAME,
                functionName: 'withdraw-fees',
                functionArgs: [],
                network: 'mainnet',
                anchorMode: AnchorMode.Any,
                postConditionMode: PostConditionMode.Allow,
                onFinish: (data) => {
                    addToast('Success', `Withdrawal TX Broadcasted: ${data.txId}`, 'success');
                    setLoading(false);
                },
                onCancel: () => setLoading(false),
            });
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    };

    const handleWithdrawAllV4 = async () => {
        alert("This requires deploying the V4 contract first! Use the Deployer tab.");
    };

    if (userAddress !== CONTRACT_ADDRESS) {
        return (
            <div className="glass-card" style={{ textAlign: 'center', borderColor: 'var(--error)' }}>
                <h2>🚫 Access Denied</h2>
                <p>Only the contract owner can view this panel.</p>
            </div>
        );
    }

    return (
        <div className="content-animate">
            <div className="glass-card" style={{ border: '1px solid var(--premium-gold)', background: 'rgba(251, 191, 36, 0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <span style={{ fontSize: '2rem' }}>👑</span>
                    <div>
                        <h2 style={{ margin: 0, color: 'var(--premium-gold)' }}>Owner Administration</h2>
                        <p style={{ margin: 0, color: 'var(--text-muted)' }}>Manage contract funds and parameters</p>
                    </div>
                </div>

                <div className="stats-grid" style={{ marginBottom: '2rem' }}>
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <div className="stat-label">Total Fees Collected (Withdrawable)</div>
                        <div className="stat-value">{feesCollected} STX</div>
                    </div>
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <div className="stat-label">Total Contract Balance</div>
                        <div className="stat-value">{contractBalance} STX</div>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem', border: '1px solid var(--stacks-primary)' }}>
                    <h3 style={{ margin: '0 0 1rem 0' }}>📈 April Event Metrics</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                        <div>
                            <div className="stat-label">Participants</div>
                            <div className="stat-value" style={{ fontSize: '1.5rem' }}>1,248</div>
                        </div>
                        <div>
                            <div className="stat-label">Total Impact</div>
                            <div className="stat-value" style={{ fontSize: '1.5rem' }}>45.2k</div>
                        </div>
                        <div>
                            <div className="stat-label">Avg Score</div>
                            <div className="stat-value" style={{ fontSize: '1.5rem' }}>36.2</div>
                        </div>
                    </div>
                </div>

                <h3>Available Actions</h3>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button
                        className="btn btn-primary"
                        onClick={handleWithdrawFees}
                        disabled={loading}
                        style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}
                    >
                        {loading ? <span className="pulse">⏳ Processing...</span> : '💰 Withdraw Fees (v3)'}
                    </button>

                    <button
                        className="btn"
                        onClick={handleWithdrawAllV4}
                        style={{ borderColor: 'var(--error)', color: 'var(--error)' }}
                    >
                        🚨 Withdraw ALL (v4 Only)
                    </button>
                </div>

                <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                    <h4 style={{ color: 'var(--text-muted)' }}>Debug Info</h4>
                    <pre style={{ fontSize: '0.8rem', color: '#888' }}>
                        Owner: {CONTRACT_ADDRESS}<br />
                        Current User: {userAddress}<br />
                        Status: Authorized
                    </pre>
                </div>
            </div>
        </div>
    );
};
