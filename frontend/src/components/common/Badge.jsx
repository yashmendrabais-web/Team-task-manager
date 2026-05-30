import React from 'react';

const Badge = React.memo(({ children, color = 'bg-blue-100 text-blue-700', size = 'sm' }) => {
  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };
  const colorMap = {
    'primary': 'bg-blue-100 text-blue-700 border border-blue-200',
    'success': 'bg-green-100 text-green-700 border border-green-200',
    'warning': 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    'danger': 'bg-red-100 text-red-700 border border-red-200',
    'info': 'bg-indigo-100 text-indigo-700 border border-indigo-200',
    'secondary': 'bg-purple-100 text-purple-700 border border-purple-200',
    'gray': 'bg-gray-100 text-gray-700 border border-gray-200',
  };
  const badgeColor = typeof color === 'string' && colorMap[color] ? colorMap[color] : color;
  return (
    <span
      className={`
        font-semibold rounded-full
        ${sizeClasses[size]}
        ${badgeColor}
      `}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';
export { Badge };
export default Badge;
