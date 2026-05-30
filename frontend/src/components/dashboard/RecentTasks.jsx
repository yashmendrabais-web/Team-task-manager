import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { List, TrendingUp } from 'lucide-react';
import { TaskStatusBadge } from '../tasks/TaskStatusBadge';
import { Badge } from '../common/Badge';
import { formatDate, isOverdue } from '../../utils/formatDate';

const getTaskId = (task) => task?.id ?? task?._id;
const getProjectId = (task) => task?.project_id ?? task?.project?.id ?? task?.project?._id;
const getProjectName = (task) => task?.project_name ?? task?.project?.name ?? 'Project';
const getDueDate = (task) => task?.due_date ?? task?.dueDate;

const RecentTasks = memo(({ tasks = [] }) => {
  const recentTasks = tasks.slice(0, 10);
  if (recentTasks.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center">
        <List className="mx-auto h-16 w-16 text-blue-300" />
        <h3 className="mt-4 text-lg font-semibold text-gray-900">No recent tasks</h3>
        <p className="mt-2 text-sm text-gray-600">New tasks will appear here.</p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100">
      <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center">
          <TrendingUp className="h-6 w-6 text-blue-600 mr-3" />
          <h2 className="text-lg font-bold text-gray-900">Recent Tasks</h2>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">{recentTasks.length}</span>
      </div>
      
      <div className="md:hidden">
        {recentTasks.map(task => (
          <Link to={`/projects/${getProjectId(task)}`} key={getTaskId(task)} className="block p-4 border-b border-gray-100 hover:bg-blue-50 transition-colors">
            <div className="flex justify-between items-start">
              <p className="font-semibold text-gray-900">{task.title}</p>
              <Badge color="primary">{task.priority}</Badge>
            </div>
            <p className="text-sm text-gray-500 mt-1">{getProjectName(task)}</p>
            <div className="flex justify-between items-center mt-3">
              <TaskStatusBadge status={task.status} />
              <span className={`text-sm font-medium ${isOverdue(getDueDate(task)) ? 'text-red-600' : 'text-gray-500'}`}>
                {formatDate(getDueDate(task))}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="hidden md:block">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gradient-to-r from-blue-50 to-cyan-50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Project</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Priority</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Due Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {recentTasks.map(task => (
              <tr key={getTaskId(task)} className="hover:bg-blue-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/projects/${getProjectId(task)}`} className="text-sm font-semibold text-blue-600 hover:text-cyan-600">{task.title}</Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{getProjectName(task)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <TaskStatusBadge status={task.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge color="primary">{task.priority}</Badge>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isOverdue(getDueDate(task)) ? 'text-red-600' : 'text-gray-500'}`}>
                  {formatDate(getDueDate(task))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

RecentTasks.displayName = 'RecentTasks';

export default RecentTasks;
export { RecentTasks };

