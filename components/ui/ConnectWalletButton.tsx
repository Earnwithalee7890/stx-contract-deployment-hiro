import React, { useState } from 'react';

export const ConnectWalletButton: React.FC = () => {
    const [connecting, setConnecting] = useState(false);
    const [connected, setConnected] = useState(false);

    const handleConnect = () => {
        setConnecting(true);
        // Simulate connection
        setTimeout(() => {
            setConnecting(false);
            setConnected(true);
        }, 1500);
    };

    return (
        <button 
            onClick={handleConnect}
            disabled={connecting || connected}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${
                connected 
                ? 'bg-green-500 text-white cursor-default' 
                : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg active:scale-95'
            }`}
        >
            {connecting ? (
                <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connecting...
                </span>
            ) : connected ? 'Connected' : 'Connect Wallet'}
        </button>
    );
};
