import React from 'react';

interface ScoreBarProps {
  value: number;
  max?: number;
  color?: string;
  showValue?: boolean;
  height?: string;
}

export default function ScoreBar({ value, max = 100, color = 'bg-blue-600', showValue = true, height = 'h-2' }: ScoreBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="flex items-center gap-2 w-full">
      <div className={`flex-1 bg-slate-100 rounded-full overflow-hidden ${height}`}>
        <div
          className={`${height} ${color} rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-slate-600 tabular-nums w-8 text-right">{value}</span>
      )}
    </div>
  );
}