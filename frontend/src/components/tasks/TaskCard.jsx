import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Clock, MoreVertical, Trash2, Edit, User } from 'lucide-react';
import Badge from '../common/Badge';
import { formatDate } from '../../utils/formatDate';
import { PRIORITY_COLORS, PRIORITY_LABELS, TASK_STATUS, MEMBER_ROLE, STATUS_LABELS } from '../../utils/constants';

const TaskCard = React.memo(({ task, onStatusChange, onEdit, onDelete, currentUserId, userRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { id, title, description, status, priority, due_date, assigned_to_name, created_by } = task;
  const isOverdue = new Date(due_date) < new Date() && status !== TASK_STATUS.DONE;
  const canModify = userRole === MEMBER_ROLE.ADMIN || created_by === currentUserId;
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleStatusChange = (newStatus) => {
    onStatusChange(id, newStatus);
  };
  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col space-y-3 border border-gray-100 hover:border-blue-200 hover:scale-105 hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-900 pr-2 flex-1">{title}</h3>
        <div className="flex-shrink-0 flex items-center space-x-2">
          <Badge color={PRIORITY_COLORS[priority]}>{PRIORITY_LABELS[priority]}</Badge>
          {canModify && (
            <div className="relative" ref={menuRef}>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors">
                <MoreVertical size={18} />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-xl z-20 border border-gray-100">
                  <button onClick={() => { onEdit(task); setIsMenuOpen(false); }} className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100">
                    <Edit size={16} className="mr-2" /> Edit
                  </button>
                  <button onClick={() => { onDelete(id); setIsMenuOpen(false); }} className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <Trash2 size={16} className="mr-2" /> Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {canModify && (
        <div className="flex flex-wrap gap-2">
          {Object.values(TASK_STATUS).map((nextStatus) => (
            <button
              key={nextStatus}
              type="button"
              onClick={() => handleStatusChange(nextStatus)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                status === nextStatus
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
              }`}
            >
              {STATUS_LABELS[nextStatus] || nextStatus}
            </button>
          ))}
        </div>
      )}
      {description && (
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
      )}
      <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
        <User size={16} className="mr-2 flex-shrink-0 text-blue-500" />
        <span>{assigned_to_name || 'Unassigned'}</span>
      </div>
      <div className={`flex items-center text-sm px-3 py-2 rounded-lg ${isOverdue ? 'bg-red-50 text-red-600 font-medium' : 'bg-blue-50 text-gray-600'}`}>
        <Calendar size={16} className="mr-2 flex-shrink-0" />
        <span>{formatDate(due_date)}</span>
        {isOverdue && <Clock size={16} className="ml-2 flex-shrink-0" />}
      </div>
    </div>
  );
});

export { TaskCard };
export default TaskCard;

