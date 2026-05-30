import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, CheckSquare, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from './Button';

const NavItem = ({ to, icon: Icon, children, disabled }) => {
  const commonClasses = "flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-200";
  const activeClasses = "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 font-medium border-l-4 border-blue-500 shadow-sm";
  const inactiveClasses = "text-gray-600 hover:bg-gray-100";
  const disabledClasses = "text-gray-400 cursor-not-allowed";
  if (disabled) {
    return (
      <div className={`${commonClasses} ${disabledClasses}`}>
        <Icon className="mr-3 h-5 w-5" />
        <span>{children}</span>
        <span className="ml-auto text-xs text-gray-400">Coming Soon</span>
      </div>
    );
  }
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `${commonClasses} ${isActive ? activeClasses : inactiveClasses}`
      }
    >
      <Icon className="mr-3 h-5 w-5" />
      <span>{children}</span>
    </NavLink>
  );
};
const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  const sidebarContent = (
    <div className="flex h-full flex-col bg-white">
      <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">TaskFlow</h1>
        <p className="text-xs text-gray-500 mt-1">Task Management System</p>
      </div>
      <nav className="flex-1 space-y-2 px-4 py-6">
        <NavItem to="/" icon={LayoutDashboard}>Dashboard</NavItem>
        <NavItem to="/projects" icon={FolderKanban}>Projects</NavItem>
        <NavItem to="/my-tasks" icon={CheckSquare}>My Tasks</NavItem>
      </nav>
      <div className="border-t border-gray-200 p-4 bg-gradient-to-b from-gray-50 to-blue-50">
        <div className="mb-4 flex items-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 text-white font-bold shadow-md">
            {user?.name?.[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-left text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div
        className={`fixed inset-0 z-50 transform bg-black bg-opacity-50 transition-transform lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={onClose}
      >
        <div
          className="relative h-full w-64 bg-white shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {sidebarContent}
        </div>
      </div>

      <aside className="hidden lg:fixed lg:top-16 lg:inset-y-16 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200">
        {sidebarContent}
      </aside>
    </>
  );
};

export { Sidebar };
export default React.memo(Sidebar);
