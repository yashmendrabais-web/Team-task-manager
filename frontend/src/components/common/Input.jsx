import React from 'react';
import { AlertCircle } from 'lucide-react';

const Input = React.memo(({
  label,
  error,
  placeholder,
  type = 'text',
  register,
  required = false,
  className = '',
  ...props
}) => {
  const registerProps = register ? register(label, { required }) : {};
  return (
    <div className={`w-full ${className}`}>
      {label && <label htmlFor={label} className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>}
      <input
        id={label}
        type={type}
        placeholder={placeholder}
        className={`
          w-full px-4 py-3 border-1.5 rounded-lg 
          font-medium transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-1
          ${error 
            ? 'border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50' 
            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200 bg-white'
          }
        `}
        {...registerProps}
        {...props}
      />
      {error && (
        <div className="mt-2 flex items-center text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
          <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{typeof error === 'string' ? error : error?.message}</span>
        </div>
      )}    
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
export { Input };

