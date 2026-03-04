import './globals.css'
import './mobile-responsive.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ['latin'] })

import { ToastProvider } from '@/components/AchievementSystem';

export const metadata: Metadata = {
    title: 'STX Builder Hub | Premium Deployer',
    description: 'Deploy contracts, mint NFTs, and manage Stacks assets with premium tools',
    icons: {
        icon: '/logo.png',
        shortcut: '/logo.png',
        apple: '/logo.png',
    },
    other: {
        'talentapp:project_verification': 'a8f61c64dc385caafdfda20fbbc2325d3aeb00352cac713bdf9dec14541fc21f6043b86e621d1322e8b5b0a0f6aa5683dbb890aeda5f644b4bc8f404f6a3d1a0'
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ToastProvider>
                    {children}
                </ToastProvider>
                <Analytics />
            </body>
        </html>
    )
}
