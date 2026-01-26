'use client';

// Robust Polyfill for Vercel/Next.js environment
import { Buffer } from 'buffer';

if (typeof window !== 'undefined') {
    if (typeof (window as any).global === 'undefined') {
        (window as any).global = window;
    }
    if (typeof (window as any).Buffer === 'undefined') {
        (window as any).Buffer = Buffer;
    }
}

import { useState, useCallback, useTransition } from 'react';
import { WelcomeOverlay } from './WelcomeOverlay';
import { CheckInFeed } from './CheckInFeed';
import { ContractDeployer } from './ContractDeployer';
import { JobBoard } from './JobBoard';
import { Governance } from './Governance';
import { AchievementBadges } from './AchievementBadges';
import { CodeExplorer } from './CodeExplorer';
import SocialLinks from './SocialLinks';
import ReferralDashboard from './ReferralDashboard';
import BadgeMinter from './BadgeMinter';
import { Leaderboard } from './Leaderboard';
import { useEffect } from 'react';
import { useDarkMode } from '@/lib/useDarkMode';
import { useToast } from '@/components/AchievementSystem';
import { Tooltip } from './Tooltip';
import { Roadmap } from './Roadmap';
import { FAQ } from './FAQ';
import { GasEstimator } from './GasEstimator';
import { ContractBrowser } from './ContractBrowser';
import { UserSettings } from './UserSettings';
import { FeedbackForm } from './FeedbackForm';
import { Modal } from './Modal';
import { AdminPanelView } from './views/AdminPanelView';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { DashboardView } from './views/DashboardView';
import { ToolsView } from './views/ToolsView';


/**
 * The main client-side entry point for the STX Builder Hub.
 * Manages wallet connection, navigation, and core dashboard actions.
 * 
 * Includes logic for routing between:
 * - Dashboard (Stats & Actions)
 * - Admin Panel (Owner Only)
 * - Tools & Utilities
 * 
 * Week 3: Migrated to WalletKit SDK for Week 3 tracking compliance.
 */
export default function ClientPage() {
    /** The authenticated user's Stacks address */
    const [userAddress, setUserAddress] = useState('');
    const { isDark, toggleDarkMode } = useDarkMode();
    const { addToast } = useToast();
    /** Current active navigation tab */
    const [activeTab, setActiveTabStart] = useState<'dashboard' | 'deploy' | 'activity' | 'jobs' | 'governance' | 'badges' | 'explorer' | 'referrals' | 'nft-badges' | 'admin' | 'tools'>('dashboard');
    const [isPending, startTransition] = useTransition();

    const setActiveTab = (tab: any) => {
        startTransition(() => {
            setActiveTabStart(tab);
        });
    };

    // Handle tab change with scroll to content
    const handleTabChange = useCallback((tab: string) => {
        console.log('Tab clicked:', tab);
        setActiveTab(tab);

        // Scroll to content after tab change
        setTimeout(() => {
            // Find the main content area (after the header)
            const header = document.querySelector('.sticky-header');
            if (header) {
                const headerHeight = header.getBoundingClientRect().height;
                // Scroll to just below the header with some padding
                window.scrollTo({
                    top: headerHeight + 100,
                    behavior: 'smooth'
                });
            } else {
                // Fallback: scroll to a reasonable position
                window.scrollTo({
                    top: 400,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }, []);

    // Dashboard state
    /** Total number of successful check-ins detected locally */
    const [checkInCount, setCheckInCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Detect referral in URL
        const params = new URLSearchParams(window.location.search);
        const ref = params.get('ref');
        if (ref) {
            localStorage.setItem('referral_code', ref);
            console.log('Referral detected:', ref);
        }
    }, []);

    const handleConnect = useCallback(async () => {
        if (typeof window === 'undefined') return;

        // Dynamic import to ensure polyfill runs first
        const { showConnect } = await import('@stacks/connect');

        showConnect({
            appDetails: {
                name: 'STX Builder Hub',
                icon: '/logo.png',
            },
            onFinish: (data) => {
                const addr = data.userSession.loadUserData().profile.stxAddress.mainnet;
                setUserAddress(addr);
                setMessage('✅ Wallet connected!');
                addToast('New Milestone!', 'Builder Portfolio Connected successfully.', 'achievement');
            },
            onCancel: () => {
                setMessage('❌ Connection cancelled');
            },
        });
    }, []);

    const handleCheckIn = async () => {
        if (!userAddress) {
            setMessage('❌ Please connect wallet first');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const { openContractCall } = await import('@stacks/connect');
            const { AnchorMode, PostConditionMode } = await import('@stacks/transactions');

            await openContractCall({
                contractAddress: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT',
                contractName: 'builder-rewards-v3', // V3 with 0.1 STX fees
                functionName: 'daily-check-in',
                functionArgs: [],
                network: 'mainnet',
                anchorMode: AnchorMode.Any,
                postConditionMode: PostConditionMode.Allow, // Allow 0.1 STX fee payment
                onFinish: (data) => {
                    setMessage(`✅ Check-in successful! Fee paid: 0.1 STX | TX: ${data.txId}`);
                    setCheckInCount(prev => prev + 1);
                    setLoading(false);
                },
                onCancel: () => {
                    setMessage('❌ Transaction cancelled');
                    setLoading(false);
                },
            });
        } catch (error) {
            setMessage(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            setLoading(false);
        }
    };

    const handleClaimReward = async () => {
        if (!userAddress) {
            setMessage('❌ Please connect wallet first');
            return;
        }

        setLoading(true);
        setMessage('');

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
                    setMessage(`✅ Reward claimed! You got 0.1 STX! Fee paid: 0.1 STX | TX: ${data.txId}`);
                    setLoading(false);
                },
                onCancel: () => {
                    setMessage('❌ Transaction cancelled');
                    setLoading(false);
                },
            });
        } catch (error) {
            setMessage(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            setLoading(false);
        }
    };

    const handleClaimCheckinRewards = async () => {
        if (!userAddress) {
            setMessage('❌ Please connect wallet first');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const { openContractCall } = await import('@stacks/connect');
            const { AnchorMode, PostConditionMode } = await import('@stacks/transactions');

            await openContractCall({
                contractAddress: 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT',
                contractName: 'checkin-rewards',
                functionName: 'claim-rewards',
                functionArgs: [],
                network: 'mainnet',
                anchorMode: AnchorMode.Any,
                postConditionMode: PostConditionMode.Allow,
                onFinish: (data) => {
                    setMessage(`✅ Check-in rewards claimed successfully! TX: ${data.txId}`);
                    setLoading(false);
                },
                onCancel: () => {
                    setMessage('❌ Transaction cancelled');
                    setLoading(false);
                },
            });
        } catch (error) {
            setMessage(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            setLoading(false);
        }
    };

    const handleShare = () => {
        if (typeof window === 'undefined') return;
        navigator.clipboard.writeText(window.location.href);
        addToast('Link Copied!', 'Dashboard URL has been copied to your clipboard.', 'success');
    };

    return (
        <>
            <WelcomeOverlay />
            <div className="container">
                <Header
                    activeTab={activeTab}
                    setActiveTab={handleTabChange}
                    userAddress={userAddress}
                    handleConnect={handleConnect}
                />

                {activeTab === 'dashboard' && (
                    <DashboardView
                        userAddress={userAddress}
                        checkInCount={checkInCount}
                        loading={loading}
                        message={message}
                        handleCheckIn={handleCheckIn}
                        handleClaimReward={handleClaimReward}
                        handleClaimCheckinRewards={handleClaimCheckinRewards}
                    />
                )}

                {userAddress && (
                    <>
                        {activeTab === 'deploy' && <div className="content-animate"><ContractDeployer /></div>}

                        {activeTab === 'activity' && <div className="content-animate"><CheckInFeed /></div>}

                        {activeTab === 'jobs' && <div className="content-animate"><JobBoard userAddress={userAddress} setMessage={setMessage} /></div>}

                        {activeTab === 'governance' && <div className="content-animate"><Governance userAddress={userAddress} setMessage={setMessage} /></div>}

                        {activeTab === 'explorer' && <div className="content-animate"><CodeExplorer /></div>}

                        {activeTab === 'badges' && <div className="content-animate"><AchievementBadges /></div>}

                        {activeTab === 'referrals' && <div className="content-animate"><ReferralDashboard /></div>}

                        {activeTab === 'nft-badges' && <div className="content-animate"><BadgeMinter /></div>}

                        {activeTab === 'tools' && <ToolsView userAddress={userAddress} />}

                        {activeTab === 'admin' && <AdminPanelView userAddress={userAddress} />}

                    </>
                )}

                <SocialLinks />

                <Footer setActiveTab={handleTabChange} />
            </div>
            <div className="page-transition-overlay"></div>
        </>

    );
}
