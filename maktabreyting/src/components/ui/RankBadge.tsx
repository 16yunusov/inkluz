import React from 'react';

interface RankBadgeProps {
  rank: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function RankBadge({ rank, size = 'md' }: RankBadgeProps) {
  const sizeMap = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  if (rank === 1) {
    return (
      <div className={`${sizeMap[size]} rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 flex items-center justify-center font-bold text-white shadow-md`}>
        1
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className={`${sizeMap[size]} rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center font-bold text-white shadow-md`}>
        2
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className={`${sizeMap[size]} rounded-full bg-gradient-to-br from-orange-300 to-orange-600 flex items-center justify-center font-bold text-white shadow-md`}>
        3
      </div>
    );
  }

  return (
    <div className={`${sizeMap[size]} rounded-full bg-slate-100 flex items-center justify-center font-semibold text-slate-600 tabular-nums`}>
      {rank}
    </div>
  );
}