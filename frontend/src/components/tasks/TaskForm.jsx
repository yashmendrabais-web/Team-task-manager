import React from 'react';
import { useForm } from 'react-hook-form';
import { Loader } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import { TASK_STATUS, TASK_PRIORITY } from '../../utils/constants';

const TaskForm = React.memo(({ onSubmit, defaultValues = {}, loading, isEdit = false, members = [], projectId }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      ...defaultValues,
      due_date: defaultValues.due_date ? defaultValues.due_date.split('T')[0] : '',
      project_id: projectId,
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Input
            label="Title"
            {...register('title', { required: 'Title is required', maxLength: { value: 200, message: 'Title must be less than 200 characters' } })}
            error={errors.title}
            placeholder="e.g., Implement user authentication"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            {...register('description')}
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Add a more detailed description..."
          ></textarea>
        </div>
        <div>
          <label htmlFor="assigned_to" className="block text-sm font-medium text-gray-700">Assign To</label>
          <select
            id="assigned_to"
            {...register('assigned_to')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Unassigned</option>
            {members.map(member => (
              <option key={member.id} value={member.id}>{member.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            {...register('status')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value={TASK_STATUS.TODO}>To Do</option>
            <option value={TASK_STATUS.IN_PROGRESS}>In Progress</option>
            <option value={TASK_STATUS.DONE}>Done</option>
          </select>
        </div>
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            id="priority"
            {...register('priority')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value={TASK_PRIORITY.LOW}>Low</option>
            <option value={TASK_PRIORITY.MEDIUM}>Medium</option>
            <option value={TASK_PRIORITY.HIGH}>High</option>
          </select>
        </div>
        <div>
          <Input
            label="Due Date"
            type="date"
            {...register('due_date')}
            error={errors.due_date}
          />
        </div>
      </div>
      <div className="md:col-span-2">
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? <Loader className="animate-spin" /> : (isEdit ? 'Update Task' : 'Create Task')}
        </Button>
      </div>
    </form>
  );
});

export { TaskForm };
export default TaskForm;
