import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const Modal = React.memo(({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  const modalRef = useRef();
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeydown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [isOpen, onClose]);
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 transition-opacity duration-300 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`
          bg-white rounded-2xl shadow-2xl w-full border border-gray-100
          ${sizeClasses[size]} 
          flex flex-col transform transition-all duration-300 scale-95 opacity-0
          ${isOpen ? 'scale-100 opacity-100' : ''}
        `}
        style={{ transformOrigin: 'center' }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-900">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          {children}
        </div>
      </div>
    </div>
  );
});

Modal.displayName = 'Modal';
export { Modal };

