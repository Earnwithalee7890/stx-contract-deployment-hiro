import React from 'react';

export const UserRankChart: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 rounded-xl text-white">
      <h3 className="text-sm font-semibold mb-4 text-slate-400 uppercase tracking-widest">Growth Analytics</h3>
      <div className="h-32 flex items-end gap-2">
        {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
          <div 
            key={i} 
            className="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-md hover:opacity-80 transition-opacity cursor-pointer group relative"
            style={{ height: `${h}%` }}
          >
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] hidden group-hover:block bg-black px-1 rounded">{h}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-mono">
        <span>MON</span>
        <span>TUE</span>
        <span>WED</span>
        <span>THU</span>
        <span>FRI</span>
        <span>SAT</span>
        <span>SUN</span>
      </div>
    </div>
  );
};
