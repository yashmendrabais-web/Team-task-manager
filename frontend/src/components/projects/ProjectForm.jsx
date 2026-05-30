import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../common/Input';
import Button from '../common/Button';

const ProjectForm = React.memo(({ onSubmit, defaultValues, loading, isEdit = false }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: defaultValues || { name: '', description: '' },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Project Name"
        {...register('name', { 
          required: 'Project name is required', 
          maxLength: { value: 100, message: 'Name cannot exceed 100 characters' } 
        })}
        error={errors.name}
        placeholder="Enter project name"
      />
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          {...register('description', { 
            maxLength: { value: 500, message: 'Description cannot exceed 500 characters' } 
          })}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter a brief description (optional)"
        ></textarea>
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Submitting...' : (isEdit ? 'Update Project' : 'Create Project')}
      </Button>
    </form>
  );
});

export { ProjectForm };
export default ProjectForm;
