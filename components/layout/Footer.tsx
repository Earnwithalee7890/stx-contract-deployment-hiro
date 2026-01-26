
interface FooterProps {
    setActiveTab: (tab: string) => void;
}

/**
 * Global footer component displaying links and resources.
 */
export const Footer = ({ setActiveTab }: FooterProps) => {
    return (
        <footer className="main-footer" style={{ padding: '3rem 0', background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)' }}>
            <div className="footer-content">
                <div className="footer-brand-section">
                    <div className="brand">
                        <div className="logo-wrapper">
                            <img src="/logo.png" alt="STX" />
                        </div>
                        <span className="brand-name">STX <span className="highlight">Builder</span> Hub</span>
                    </div>
                    <p className="footer-desc">
                        The definitive platform for Stacks builders to track impact, deploy contracts, and grow the Bitcoin ecosystem.
                    </p>
                    <div className="footer-socials">
                        <a href="#" className="social-icon">𝕏</a>
                        <a href="#" className="social-icon">🟣</a>
                        <a href="#" className="social-icon">🐙</a>
                    </div>
                </div>

                <div className="footer-links-grid">
                    <div className="footer-column">
                        <h4>Platform</h4>
                        <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}>Dashboard</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('deploy'); }}>Deployer</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('jobs'); }}>Job Board</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('badges'); }}>Achievements</a>
                    </div>
                    <div className="footer-column">
                        <h4>Resources</h4>
                        <a href="https://docs.hiro.so" target="_blank" rel="noopener noreferrer">Hiro Docs</a>
                        <a href="https://stacks.org" target="_blank" rel="noopener noreferrer">Stacks Foundation</a>
                        <a href="https://explorer.hiro.so" target="_blank" rel="noopener noreferrer">Explorer</a>
                    </div>
                </div>

                <div className="footer-newsletter">
                    <h4>Stay Updated</h4>
                    <p>Get the latest builder rewards and news delivered to your inbox.</p>
                    <div className="newsletter-form">
                        <input type="email" placeholder="email@example.com" />
                        <button className="btn-subscribe">Subscribe</button>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2026 STX Builder Hub. Built with ❤️ for the Stacks Community.</p>
                <div className="footer-legal">
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                </div>
            </div>
        </footer>
    );
};
