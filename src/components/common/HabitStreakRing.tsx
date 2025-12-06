import React from 'react';

interface Props {
  streak: number;
}

const HabitStreakRing: React.FC<Props> = ({ streak }) => {
  const normalized = Math.min(streak, 30);
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (normalized / 30) * circumference;

  let gradientId = 'streak-teal';
  if (streak >= 22) gradientId = 'streak-gold';
  else if (streak >= 8) gradientId = 'streak-lilac';

  return (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="streak-teal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6fffe9" />
          <stop offset="100%" stopColor="#80e8dd" />
        </linearGradient>
        <linearGradient id="streak-lilac" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6fffe9" />
          <stop offset="50%" stopColor="#b8a9ff" />
          <stop offset="100%" stopColor="#f4d58d" />
        </linearGradient>
        <linearGradient id="streak-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f4d58d" />
          <stop offset="50%" stopColor="#b8a9ff" />
          <stop offset="100%" stopColor="#6fffe9" />
        </linearGradient>
      </defs>
      <circle
        cx="32"
        cy="32"
        r={radius}
        stroke="rgba(15,23,42,0.85)"
        strokeWidth="5"
        fill="none"
      />
      <circle
        cx="32"
        cy="32"
        r={radius}
        stroke={`url(#${gradientId})`}
        strokeWidth="5"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s ease-out' }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="12"
        fill="#e5e7eb"
      >
        {streak}🔥
      </text>
    </svg>
  );
};

export default HabitStreakRing;
