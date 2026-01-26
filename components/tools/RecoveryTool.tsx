/**
 * @packageDocumentation
 * Recovery tool for executing 80-wallet claim strategy.
 */
import { useState, useEffect } from 'react';
import { useToast } from '@/components/AchievementSystem';

interface RecoveryToolProps {
    userAddress: string;
}

/**
 * Utility tool to help execute the 80-wallet claim strategy.
 * Tracks local progress of claimed wallets.
 */
export const RecoveryTool = ({ userAddress }: RecoveryToolProps) => {
    const { addToast } = useToast();
    const [claimedCount, setClaimedCount] = useState(0);
    const [isEligible, setIsEligible] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('recovery_claimed_count');
        if (stored) setClaimedCount(parseInt(stored));
    }, []);

    const incrementCount = () => {
        const newCount = claimedCount + 1;
        setClaimedCount(newCount);
        localStorage.setItem('recovery_claimed_count', newCount.toString());
    };

    const checkEligibility = async () => {
        if (!userAddress) return;
        setLoading(true);
        // Mock check - in reality, would call read-only function
        // For now, allow it.
        setTimeout(() => {
            setIsEligible(true);
            setLoading(false);
            addToast('Status', 'Wallet is eligible for claim (Simulated)', 'info');
        }, 1000);
    };

    const handleClaim = async () => {
        setLoading(true);
        try {
            const { openContractCall } = await import('@stacks/connect');
            const { AnchorMode, PostConditionMode } = await import('@stacks/transactions');

            await openContractCall({
                contractAddress: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT',
                contractName: 'builder-rewards-v3',
                functionName: 'claim-daily-reward',
                functionArgs: [],
                network: 'mainnet',
                anchorMode: AnchorMode.Any,
                postConditionMode: PostConditionMode.Allow,
                onFinish: (data) => {
                    addToast('Success', `Claim TX Broadcasted: ${data.txId}`, 'success');
                    incrementCount();
                    setLoading(false);
                },
                onCancel: () => setLoading(false),
            });
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    };

    return (
        <div className="glass-card" style={{ borderColor: '#ec4899' }}>
            <h3 style={{ color: '#ec4899', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🔄 8 STX Recovery Assistant
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Use this tool to execute the "Fee Swap" strategy.
                Cycle through 80 different wallets to move funds from Reward Pool to Fees.
            </p>

            <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Progress</span>
                    <span>{claimedCount} / 80 Wallets</span>
                </div>
                <div className="exp-bar-container">
                    <div
                        className="exp-bar-fill"
                        style={{
                            width: `${(claimedCount / 80) * 100}%`,
                            background: 'linear-gradient(90deg, #ec4899, #8b5cf6)',
                            transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    ></div>
                </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px', marginBottom: '1rem' }}>
                <strong>Current Wallet:</strong> {userAddress || 'Not Connected'}<br />
                <strong>Status:</strong> {isEligible === null ? 'Unknown' : (isEligible ? '✅ Eligible' : '❌ Already Claimed')}
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                    className="btn"
                    onClick={checkEligibility}
                    disabled={!userAddress || loading}
                >
                    🔍 Check Eligibility
                </button>

                <button
                    className="btn btn-primary"
                    onClick={handleClaim}
                    disabled={!userAddress || loading}
                    style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}
                >
                    💸 Claim (Swap 0.1 STX)
                </button>

                <button
                    className="btn"
                    onClick={() => {
                        setClaimedCount(0);
                        localStorage.setItem('recovery_claimed_count', '0');
                    }}
                    style={{ marginLeft: 'auto', fontSize: '0.8rem', padding: '0.5rem' }}
                >
                    Reset Counter
                </button>
            </div>
        </div>
    );
};
