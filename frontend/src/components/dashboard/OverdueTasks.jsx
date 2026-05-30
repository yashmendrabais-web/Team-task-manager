import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { TaskStatusBadge } from '../tasks/TaskStatusBadge';
import { formatDate } from '../../utils/formatDate';

const getTaskId = (task) => task?.id ?? task?._id;
const getProjectId = (task) => task?.project_id ?? task?.project?.id ?? task?.project?._id;
const getProjectName = (task) => task?.project_name ?? task?.project?.name ?? 'Project';
const getDueDate = (task) => task?.due_date ?? task?.dueDate;
const OverdueTasks = memo(({ tasks = [] }) => {
  const overdueTasks = tasks.slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 h-fit">
      <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-red-50 to-orange-50 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
          <h2 className="text-lg font-bold text-gray-900">Overdue Tasks</h2>
        </div>
        {overdueTasks.length > 0 && <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">{overdueTasks.length}</span>}
      </div>
      {overdueTasks.length === 0 ? (
        <div className="text-center py-10 px-6">
          <CheckCircle className="mx-auto h-16 w-16 text-green-400" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900">No overdue tasks</h3>
          <p className="mt-2 text-sm text-gray-600">Keep up the great work! 🎉</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {overdueTasks.map(task => (
            <li key={getTaskId(task)} className="p-4 hover:bg-red-50 transition-colors border-b last:border-b-0">
              <Link to={`/projects/${getProjectId(task)}`} className="block group">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">{task.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{getProjectName(task)}</p>
                  </div>
                  <TaskStatusBadge status={task.status} />
                </div>
                <p className="text-sm font-bold text-red-600 mt-3 bg-red-50 px-3 py-1 rounded-lg inline-block">
                  Due: {formatDate(getDueDate(task))}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

OverdueTasks.displayName = 'OverdueTasks';

export default OverdueTasks;
export { OverdueTasks };

