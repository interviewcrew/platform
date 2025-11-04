import React from 'react';

type InterviewCrewLogoProps = {
  className?: string;
  variant?: 'light' | 'dark';
};

export function InterviewCrewLogo({ className = "", variant = "dark" }: InterviewCrewLogoProps) {
  const textColor = variant === "light" ? "#ffffff" : "#1e293b";
  const accentColor = variant === "light" ? "#fbbf24" : "#3b82f6";
  const secondaryColor = variant === "light" ? "#f59e0b" : "#6366f1";
  
  return (
    <svg
      className={className}
      viewBox="0 0 240 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main text with gradient effect */}
      <defs>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={textColor} />
          <stop offset="70%" stopColor={textColor} />
          <stop offset="100%" stopColor={accentColor} />
        </linearGradient>
      </defs>
      
      <text
        x="0"
        y="28"
        fontSize="24"
        fontWeight="700"
        fill="url(#textGradient)"
        fontFamily="Inter, system-ui, sans-serif"
        letterSpacing="-0.02em"
      >
        InterviewCrew
      </text>
      
      {/* Modern accent elements */}
      <circle
        cx="200"
        cy="12"
        r="3"
        fill={accentColor}
        opacity="0.8"
      />
      <circle
        cx="210"
        cy="16"
        r="2"
        fill={secondaryColor}
        opacity="0.6"
      />
      
      {/* Subtle connecting line */}
      <line
        x1="195"
        y1="20"
        x2="200"
        y2="12"
        stroke={accentColor}
        strokeWidth="1"
        opacity="0.4"
      />
    </svg>
  );
}
