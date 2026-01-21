'use client';

import React from 'react';

interface ProgressBarProps {
    value: number;
    max?: number;
    showLabel?: boolean;
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'success' | 'warning' | 'danger';
}

const colorMap = {
    primary: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
    success: 'linear-gradient(90deg, #10b981, #34d399)',
    warning: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
    danger: 'linear-gradient(90deg, #ef4444, #f87171)',
};

const heightMap = {
    sm: 4,
    md: 8,
    lg: 12,
};

export function ProgressBar({
    value,
    max = 100,
    showLabel = false,
    size = 'md',
    color = 'primary',
}: ProgressBarProps) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    const height = heightMap[size];

    return (
        <div style={{ width: '100%' }}>
            <div
                style={{
                    width: '100%',
                    height: `${height}px`,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: `${height / 2}px`,
                    overflow: 'hidden',
                }}
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={max}
            >
                <div
                    style={{
                        width: `${percentage}%`,
                        height: '100%',
                        background: colorMap[color],
                        borderRadius: `${height / 2}px`,
                        transition: 'width 0.3s ease-in-out',
                    }}
                />
            </div>
            {showLabel && (
                <div style={{
                    textAlign: 'right',
                    fontSize: '12px',
                    color: '#9ca3af',
                    marginTop: '4px'
                }}>
                    {percentage.toFixed(0)}%
                </div>
            )}
        </div>
    );
}

export default ProgressBar;
