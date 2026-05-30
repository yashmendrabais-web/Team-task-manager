import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-blue-100 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 shadow-lg">
      <div className="mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-white hover:bg-white hover:bg-opacity-20 transition-all duration-200 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="ml-2 text-xl font-bold text-white lg:hidden">TaskFlow</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="rounded-lg p-2 text-white hover:bg-white hover:bg-opacity-20 transition-all duration-200 relative">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-400 rounded-full"></span>
          </button>
          <div className="flex items-center">
            <div className="hidden sm:block text-right mr-3">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-blue-100">Team Member</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-blue-600 font-bold shadow-md hover:shadow-lg transition-all duration-200">
              {user?.name?.[0].toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Navbar };
export default React.memo(Navbar);

