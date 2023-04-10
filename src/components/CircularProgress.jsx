import React, { useState, useEffect } from 'react';

const CircularProgress = ({ size, progress }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * Math.PI * (size - 10);
    setOffset(progressOffset);
    console.log(progress);
  }, [setOffset, progress, size]);

  return (
    <svg width={size} height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 5}
        stroke="#e6e6e6"
        strokeWidth="10"
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 5}
        stroke="#00adb5"
        strokeWidth="10"
        fill="none"
        strokeDasharray={`${Math.PI * (size - 10)} ${Math.PI * (size - 10)}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        fill="#fff"
        fontSize="20"
        fontWeight="bold"
        dy=".3em"
      >
        {`${progress}%`}
      </text>
    </svg>
  );
};

export default CircularProgress;
