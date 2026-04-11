import React from 'react';

interface ParticipantCardProps {
  handle: string;
  address: string;
  score: number;
}

export const ParticipantCard: React.FC<ParticipantCardProps> = ({ handle, address, score }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">@{handle}</h3>
          <p className="text-sm text-slate-500 font-mono">{address.substring(0, 8)}...{address.substring(address.length - 4)}</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-purple-600">{score}</span>
          <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Points</p>
        </div>
      </div>
    </div>
  );
};
