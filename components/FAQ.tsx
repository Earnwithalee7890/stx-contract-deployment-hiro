'use client';

import { useState } from 'react';

/**
 * Interactive FAQ Accordion component.
 */
export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const questions = [
        { q: 'How can I become eligible for rewards?', a: 'Create your Bitcoin L2 wallet (Leather, Xverse, Asigna, or Fordefi) and connect it on talent.app. Also, connect your GitHub profile to track your contributions to public repositories.' },
        { q: 'What is the program schedule?', a: 'The January 2026 campaign runs from Jan 19-31. Rewards will be distributed on Feb 3 to the top 50 builders on the leaderboard.' },
        { q: 'How are rewards calculated?', a: 'Rewards are based on leaderboard position, determined by: on-chain impact of smart contracts, use of @stacks/connect/transactions, and GitHub contributions.' },
        { q: 'How are tokens distributed?', a: 'Total pool of 15,300 $STX is split: Tier 1 (Top 10) share 50% equally, Tier 2 (Next 15) share 25% proportionally, and Tier 3 (Next 25) share 25% proportionally.' },
        { q: 'How do I receive my rewards?', a: 'Rewards are automatically distributed by Talent Protocol to the Bitcoin L2 wallet you connected in your talent.app settings.' },
        { q: 'Why is my progress "stuck"?', a: 'Each category has multiple metrics with maximum caps to prevent gaming. If you hit a cap, your progress might seem stuck until you contribute in other metrics.' },
        { q: 'What if my activity is flagged?', a: 'Activity is automatically reviewed for quality. If you believe there is a false positive, you can submit an appeal form for manual review.' },
    ];

    return (
        <div className="glass-card faq-card">
            <h2>❓ Frequently Asked Questions</h2>
            <div className="faq-list">
                {questions.map((item, i) => (
                    <div key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
                        <button className="faq-question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                            <span>{item.q}</span>
                            <span className="faq-toggle">{openIndex === i ? '−' : '+'}</span>
                        </button>
                        {openIndex === i && (
                            <div className="faq-answer">
                                <p>{item.a}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
