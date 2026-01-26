/**
 * @packageDocumentation
 * Header navigation component for the STX Builder Hub.
 */
import { useDarkMode } from '@/lib/useDarkMode';

/**
 * HeaderProps interface defining state management for navigation.
 */
interface HeaderProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    userAddress: string;
    handleConnect: () => void;
}

/**
 * Top-level navigation component containing branding, tabs, and wallet profile.
 */
export const Header = ({ activeTab, setActiveTab, userAddress, handleConnect }: HeaderProps) => {
    const { isDark, toggleDarkMode } = useDarkMode();

    return (
        <header className="sticky-header">
            <div className="nav-container">
                <div className="brand" onClick={() => setActiveTab('dashboard')}>
                    <div className="logo-wrapper">
                        <img src="/logo.png" alt="STX" />
                        <div className="logo-glow"></div>
                    </div>
                    <span className="brand-name">STX <span className="highlight">Builder</span> Hub</span>
                </div>

                <nav className="main-nav">
                    <button className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')} style={{ transition: 'all 0.2s ease', transform: activeTab === 'dashboard' ? 'scale(1.05)' : 'scale(1)' }}>
                        <span className="icon">📊</span> Dashboard
                    </button>
                    <button className={`nav-link ${activeTab === 'activity' ? 'active' : ''}`} onClick={() => setActiveTab('activity')}>
                        <span className="icon">👀</span> Activity
                    </button>
                    <button className={`nav-link ${activeTab === 'deploy' ? 'active' : ''}`} onClick={() => setActiveTab('deploy')}>
                        <span className="icon">🛠️</span> Deploy
                    </button>
                    <button className={`nav-link ${activeTab === 'jobs' ? 'active' : ''}`} onClick={() => setActiveTab('jobs')}>
                        <span className="icon">💼</span> Jobs
                    </button>
                    <button className={`nav-link ${activeTab === 'badges' ? 'active' : ''}`} onClick={() => setActiveTab('badges')}>
                        <span className="icon">🏆</span> Perks
                    </button>
                    <button className={`nav-link ${activeTab === 'tools' ? 'active' : ''}`} onClick={() => setActiveTab('tools')}>
                        <span className="icon">🧰</span> Tools
                    </button>
                    {userAddress === 'SP2F500B8DTRK1EANJQ054BRAB8DDKN6QCMXGNFBT' && (
                        <button className={`nav-link ${activeTab === 'admin' ? 'active' : ''}`} onClick={() => setActiveTab('admin')}>
                            <span className="icon">👑</span> Admin
                        </button>
                    )}
                </nav>

                <div className="header-actions">
                    <button className="theme-toggle" onClick={toggleDarkMode} title="Toggle Theme">
                        {isDark ? '🌙' : '☀️'}
                    </button>
                    {!userAddress ? (
                        <button className="btn-connect" onClick={handleConnect}>
                            <span className="icon">🦊</span> Connect
                        </button>
                    ) : (
                        <div className="user-profile-lite" title={userAddress}>
                            <div className="user-info">
                                <div className="user-meta">
                                    <span className="user-role">Master Builder</span>
                                    <span className="user-level">Lvl 42</span>
                                </div>
                                <div className="exp-bar-container">
                                    <div className="exp-bar-fill" style={{ width: '65%' }}></div>
                                </div>
                                <span className="user-addr">{userAddress.slice(0, 4)}...{userAddress.slice(-4)}</span>
                            </div>
                            <div className="user-avatar">
                                <div className="avatar-placeholder">
                                    {userAddress.slice(2, 4)}
                                </div>
                                <div className="status-indicator online"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
