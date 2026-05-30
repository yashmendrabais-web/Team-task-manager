import React from 'react';
import { memo } from 'react';
import { cn } from '../../utils/cn';

const colorMap = {
  primary: 'bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-600',
  success: 'bg-gradient-to-br from-green-100 to-emerald-100 text-green-600',
  warning: 'bg-gradient-to-br from-yellow-100 to-orange-100 text-warning-600',
  danger: 'bg-gradient-to-br from-red-100 to-pink-100 text-danger-600',
  info: 'bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600',
};
const StatsCard = memo(({ title, value, icon: Icon, color = 'primary', description }) => {
  const iconColorClass = colorMap[color] || colorMap.primary;
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 hover:scale-105 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">{value}</p>
          {description && <p className="text-xs text-gray-500 mt-2">{description}</p>}
        </div>
        <div className={cn('rounded-2xl p-4 shadow-md', iconColorClass)}>
          {Icon && <Icon className="h-8 w-8" />}
        </div>
      </div>
    </div>
  );
});

StatsCard.displayName = 'StatsCard';
export default StatsCard;
export { StatsCard };

