import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { CheckSquare, AlertTriangle } from 'lucide-react';
import { getMyTasks, deleteTask, updateTaskStatus, updateTask } from '../../api/task.api';
import { TaskBoard } from '../../components/tasks/TaskBoard';
import { TaskForm } from '../../components/tasks/TaskForm';
import { Modal } from '../../components/common/Modal';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import { useProjects } from '../../hooks/useProjects';

const MyTasks = () => {
  const { user } = useAuth();
  const { currentProject, loadProject, clearProject } = useProjects();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  useEffect(() => {
    let isActive = true;
    const loadTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getMyTasks();
        if (!isActive) {
          return;
        }
        setTasks(response.data ?? []);
      } catch (err) {
        if (!isActive) {
          return;
        }
        const message = err?.response?.data?.message || 'Failed to load your tasks.';
        setError(message);
        toast.error(message);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };
    loadTasks();
    return () => {
      isActive = false;
    };
  }, [refreshKey]);
  const handleStatusChange = useCallback(async (taskId, status) => {
    try {
      await updateTaskStatus(taskId, status);
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          String(task.id ?? task._id) === String(taskId) ? { ...task, status } : task
        )
      );
      toast.success('Task status updated.');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update status.');
    }
  }, []);
  const handleEdit = useCallback(async (task) => {
    try {
      await loadProject(task.project_id);
      setEditingTask(task);
      setIsEditOpen(true);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to load task details.');
    }
  }, [loadProject]);
  const handleDelete = useCallback(async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }
    try {
      await deleteTask(taskId);
      setTasks((currentTasks) => currentTasks.filter((task) => String(task.id ?? task._id) !== String(taskId)));
      toast.success('Task deleted successfully.');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to delete task.');
    }
  }, []);
  const handleTaskUpdate = useCallback(async (data) => {
    if (!editingTask) {
      return;
    }
    try {
      const taskId = editingTask.id ?? editingTask._id;
      await updateTask(taskId, data);
      setIsEditOpen(false);
      setEditingTask(null);
      clearProject();
      setRefreshKey((current) => current + 1);
      toast.success('Task updated successfully.');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update task.');
    }
  }, [clearProject, editingTask]);
  const handleRetry = useCallback(() => {
    setRefreshKey((current) => current + 1);
  }, []);
  if (loading) {
    return <Loader fullPage />;
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto" />
          <h2 className="mt-4 text-2xl font-semibold text-gray-900">Could not load My Tasks</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <Button onClick={handleRetry} variant="danger" className="mt-6">
            Try Again
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="page-container">
      <header className="mb-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl">
            <CheckSquare className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">My Tasks</span>
            </h1>
            <p className="mt-2 text-gray-600">Tasks assigned to you across all your projects</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm">{tasks.length} tasks</span>
            </div>
          </div>
        </div>
      </header>
      <div className="mt-8">
        <TaskBoard
          tasks={tasks}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
          currentUserId={user?.id ?? user?._id}
          userRole={user?.role || 'member'}
        />
      </div>
      <Modal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setEditingTask(null);
          clearProject();
        }}
        title="Edit Task"
        size="lg"
      >
        <TaskForm
          onSubmit={handleTaskUpdate}
          defaultValues={editingTask || {}}
          members={currentProject?.members ?? []}
          projectId={editingTask?.project_id}
          isEdit
        />
      </Modal>
    </div>
  );
};

export default MyTasks;
