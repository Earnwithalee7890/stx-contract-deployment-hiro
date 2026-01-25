export default function SocialLinks() {
    return (
        <div className="social-links glass-card" style={{ marginTop: '4rem', borderRadius: '24px' }}>
            <h3>Follow the Dev</h3>
            <div className="social-buttons">
                <a
                    href="https://farcaster.xyz/aleekhoso"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link farcaster"
                    title="View Farcaster Profile"
                >
                    <span className="icon" style={{ filter: 'grayscale(0)' }}>🟣</span>
                    <span>Farcaster</span>
                </a>
                <a
                    href="https://x.com/aleeasghar78"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link twitter"
                    title="Follow on X"
                >
                    <span className="icon">𝕏</span>
                    <span>Twitter</span>
                </a>
                <a
                    href="https://github.com/Earnwithalee7890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link github"
                    title="View GitHub Components"
                >
                    <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '4px' }}>
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                    GitHub
                </a>
                <a
                    href="https://explorer.hiro.so"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{ background: 'rgba(255, 75, 75, 0.1)', border: '1px solid rgba(255, 75, 75, 0.3)', color: '#ff4b4b' }}
                    title="Check Stacks Explorer"
                >
                    <span className="icon">🚀</span>
                    Hiro Explorer
                </a>
            </div>
        </div>
    )
}
