import React, { useState, useMemo } from 'react';
import TaskCard from './TaskCard';
import Badge from '../common/Badge';
import { TASK_STATUS, STATUS_LABELS } from '../../utils/constants';

const TaskBoard = React.memo(({ tasks, onStatusChange, onEdit, onDelete, currentUserId, userRole }) => {
  const [activeTab, setActiveTab] = useState(TASK_STATUS.TODO);
  const filteredTasks = useMemo(() => {
    const todo = tasks.filter(task => task.status === TASK_STATUS.TODO);
    const inProgress = tasks.filter(task => task.status === TASK_STATUS.IN_PROGRESS);
    const done = tasks.filter(task => task.status === TASK_STATUS.DONE);
    return {
      [TASK_STATUS.TODO]: todo,
      [TASK_STATUS.IN_PROGRESS]: inProgress,
      [TASK_STATUS.DONE]: done,
    };
  }, [tasks]);
  const columns = [
    { id: TASK_STATUS.TODO, title: STATUS_LABELS.todo, tasks: filteredTasks.todo, color: 'bg-gray-200' },
    { id: TASK_STATUS.IN_PROGRESS, title: STATUS_LABELS.in_progress, tasks: filteredTasks.in_progress, color: 'bg-blue-200' },
    { id: TASK_STATUS.DONE, title: STATUS_LABELS.done, tasks: filteredTasks.done, color: 'bg-green-200' },
  ];
  const renderColumn = (column) => (
    <div key={column.id} className="flex-1 flex flex-col">
      <div className={`p-3 rounded-t-lg ${column.color} flex justify-between items-center`}>
        <h2 className="font-semibold text-gray-800">{column.title}</h2>
        <Badge color="bg-white text-gray-700">{column.tasks.length}</Badge>
      </div>
      <div className="p-3 bg-gray-50 rounded-b-lg h-full overflow-y-auto space-y-4">
        {column.tasks.length > 0 ? (
          column.tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onEdit={onEdit}
              onDelete={onDelete}
              currentUserId={currentUserId}
              userRole={userRole}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">No tasks yet.</div>
        )}
      </div>
    </div>
  );
  return (
    <div>
      <div className="hidden md:flex md:space-x-4">
        {columns.map(renderColumn)}
      </div>
      <div className="md:hidden">
        <div className="flex border-b border-gray-200">
          {columns.map(column => (
            <button
              key={column.id}
              onClick={() => setActiveTab(column.id)}
              className={`flex-1 py-2 text-center font-medium ${activeTab === column.id ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'}`}
            >
              {column.title}
            </button>
          ))}
        </div>
        <div className="mt-4">
          {renderColumn(columns.find(c => c.id === activeTab))}
        </div>
      </div>
    </div>
  );
});

export { TaskBoard };
export default TaskBoard;
