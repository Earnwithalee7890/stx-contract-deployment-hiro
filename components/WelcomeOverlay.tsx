'use client';

import { useState, useEffect } from 'react';

export const WelcomeOverlay = () => {
    const [show, setShow] = useState(true);
    const [phase, setPhase] = useState(0);


    useEffect(() => {
        // Phase 0: Initial state
        // Phase 1: Text appears
        const t1 = setTimeout(() => setPhase(1), 500);
        // Phase 2: Secondary text
        const t2 = setTimeout(() => setPhase(2), 1500);
        // Phase 3: Fade out
        const t3 = setTimeout(() => setPhase(3), 3500);
        // Remove from DOM
        const t4 = setTimeout(() => setShow(false), 4500);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, []);

    const handleSkip = () => {
        setPhase(3);
        setTimeout(() => setShow(false), 500);
    };

    if (!show) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'radial-gradient(circle at center, #1e1b4b 0%, #000 100%)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: phase === 3 ? 0 : 1,
            transition: 'opacity 0.8s ease-out',
            pointerEvents: phase === 3 ? 'none' : 'auto',
            backdropFilter: 'blur(10px)'
        }}>
            <button
                onClick={handleSkip}
                style={{
                    position: 'absolute',
                    top: '2rem',
                    right: '2rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    opacity: phase >= 1 ? 0.7 : 0,
                    transition: 'opacity 0.5s'
                }}
            >
                Skip Intro
            </button>

            <h1 style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: '900',
                color: 'transparent',
                background: 'linear-gradient(135deg, #fff 0%, #6366f1 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                opacity: phase >= 1 ? 1 : 0,
                transform: phase >= 1 ? 'scale(1)' : 'scale(0.9)',
                transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                textAlign: 'center',
                lineHeight: 1.1,
                marginBottom: '1rem',
                textShadow: '0 10px 30px rgba(99, 102, 241, 0.3)'
            }}>
                WELCOME TO<br />
                <span style={{
                    background: 'linear-gradient(to right, #ff4b4b, #f59e0b)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 20px rgba(255, 75, 75, 0.4))'
                }}>STACKS CHECK IN</span>
            </h1>

            <div style={{
                fontSize: '1.5rem',
                color: '#94a3b8',
                opacity: phase >= 2 ? 1 : 0,
                transform: phase >= 2 ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s ease-out',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
            }}>
                Top Stacks Builders: January Event
            </div>

            <div style={{
                marginTop: '3rem',
                width: '200px',
                height: '4px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '2px',
                overflow: 'hidden',
                boxShadow: '0 0 10px rgba(99, 102, 241, 0.2)'
            }}>
                <div style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #6366f1, #ec4899)',
                    width: phase > 0 ? '100%' : '0%',
                    transition: 'width 3.5s ease-out'
                }} />
            </div>
        </div>
    );
};

