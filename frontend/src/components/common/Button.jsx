import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = React.memo(({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  children,
  className = '',
}) => {
  const baseClasses = 'font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 inline-flex items-center justify-center';
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:from-blue-700 hover:to-cyan-700 focus:ring-blue-400',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400 border border-gray-300',
    danger: 'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:shadow-lg hover:from-red-700 hover:to-pink-700 focus:ring-red-400',
    solid: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:from-blue-700 hover:to-cyan-700 focus:ring-blue-400',
    outline: 'border-2 border-blue-600 bg-white text-blue-600 hover:bg-blue-50 focus:ring-blue-400',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400',
    success: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg hover:from-green-700 hover:to-emerald-700 focus:ring-green-400',
  };
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'px-4 py-2.5',
    lg: 'text-lg px-6 py-3',
  };
  const isDisabled = loading || disabled;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
export default Button; 
export { Button };

