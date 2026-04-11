import React from 'react';

export const EventHeader: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-8 rounded-xl shadow-lg mb-8">
      <h1 className="text-4xl font-extrabold mb-2">April 2026 Talent Stacks Event</h1>
      <p className="text-xl opacity-90">Level up your Clarity skills and build the future of Bitcoin L2s.</p>
      <div className="mt-4 flex gap-4 text-sm font-medium">
        <span className="bg-white/20 px-3 py-1 rounded-full text-white">Status: Active</span>
        <span className="bg-white/20 px-3 py-1 rounded-full text-white">Participants: 156</span>
      </div>
    </header>
  );
};
