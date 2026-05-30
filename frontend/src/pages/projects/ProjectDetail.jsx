import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useProjects } from '../../hooks/useProjects';
import { useTasks } from '../../hooks/useTasks';
import { useAuth } from '../../hooks/useAuth';
import { Loader } from '../../components/common/Loader';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { MemberList } from '../../components/projects/MemberList';
import { TaskBoard } from '../../components/tasks/TaskBoard';
import { TaskForm } from '../../components/tasks/TaskForm';
import { ProjectForm } from '../../components/projects/ProjectForm';
import { ArrowLeft, Pencil, Plus } from 'lucide-react';

const TASK_FILTERS = ['all', 'todo', 'in-progress', 'done'];
const normalizeTaskStatus = (status) => String(status ?? '').trim().toLowerCase().replace(/[\s-]+/g, '_');
export const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    currentProject,
    loading: projectLoading,
    error: projectError,
    loadProject,
    clearProject,
    editProject,
    removeProject,
    addMember,
    removeMember,
  } = useProjects();
  const {
    tasks,
    loading: tasksLoading,
    loadTasks,
    clearProjectTasks,
    addTask,
    editTask,
    removeTask,
    changeStatus,
  } = useTasks();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const [taskFilter, setTaskFilter] = useState('all');
  const project = currentProject;
  const members = project?.members ?? [];
  const currentUserId = user?.id ?? user?._id;
  useEffect(() => {
    if (id) {
      loadProject(id);
      loadTasks(id);
    }
    return () => {
      clearProject();
      clearProjectTasks();
    };
  }, [id]);
  const isAdmin = project?.my_role === 'admin';
  const handleTaskFormSubmit = async (data) => {
    try {
      if (editingTask) {
        await editTask(editingTask.id ?? editingTask._id, data);
        toast.success('Task updated successfully!');
      } else {
        await addTask({ ...data, project_id: id });
        toast.success('Task created successfully!');
      }
      await loadTasks(id);
      setIsTaskModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
        err?.message ||
        'Something went wrong'
      );
    }
  };
  const handleEditProjectSubmit = async (data) => {
    try {
      await editProject(id, data);
      toast.success('Project updated successfully!');
      await loadProject(id);
      setIsEditProjectOpen(false);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
        err?.message ||
        'Something went wrong'
      );
    }
  };
  const handleDeleteProject = async () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        await removeProject(id);
        toast.success('Project deleted successfully.');
        navigate('/projects');
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
          err?.message ||
          'Something went wrong'
        );
      }
    }
  };
  const handleStatusChange = useCallback(async (taskId, status) => {
    try {
      await changeStatus(taskId, status);
      toast.success('Task status updated.');
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
        err?.message ||
        'Something went wrong'
      );
    }
  }, [changeStatus]);
  const handleTaskDelete = useCallback(async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await removeTask(taskId);
        await loadTasks(id);
        toast.success('Task deleted successfully.');
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
          err?.message ||
          'Something went wrong'
        );
      }
    }
  }, [removeTask]);
  const openEditTaskModal = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };
  const filteredTasks = tasks.filter(task => {
    if (taskFilter === 'all') return true;
    return normalizeTaskStatus(task.status) === normalizeTaskStatus(taskFilter);
  });
  if (projectLoading || tasksLoading) return <Loader />;
  if (projectError) {
    if (projectError.includes('404')) {
        navigate('/projects');
        return null;
    }
    return <div className="text-center text-red-500 p-8">Error loading project: {projectError}</div>;
  }
  if (!project) return null; // Or a not found component
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <Link to="/projects" className="flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
            <Badge color={isAdmin ? 'green' : 'blue'}>{isAdmin ? 'Admin' : 'Member'}</Badge>
          </div>
          {isAdmin && (
            <div className="flex items-center gap-2 mt-4 sm:mt-0">
              <Button variant="outline" onClick={() => setIsEditProjectOpen(true)}>
                <Pencil className="h-5 w-5 mr-2" /> Edit
              </Button>
              <Button variant="danger" onClick={handleDeleteProject}>
                 Delete
              </Button>
            </div>
          )}
        </div>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{project.description}</p>
      </div>
      <div className="mb-8">
        <MemberList
          members={members}
          isAdmin={isAdmin}
          onAdd={async (memberData) => {
            try {
              await addMember(id, {
                email: memberData.email,
                role: memberData.role,
              });
              await loadProject(id);
              toast.success('Member added!');
            } catch (err) {
              toast.error(
                err?.response?.data?.message ||
                err?.message ||
                'Something went wrong'
              );
            }
          }}
          onRemove={async (memberId) => {
            try {
              await removeMember(id, memberId);
              await loadProject(id);
              toast.success('Member removed!');
            } catch (err) {
              toast.error(
                err?.response?.data?.message ||
                err?.message ||
                'Something went wrong'
              );
            }
          }}
        />
      </div>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Tasks ({tasks.length})</h2>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              {TASK_FILTERS.map(filter => (
                <Button
                  key={filter}
                  size="sm"
                  variant={taskFilter === filter ? 'solid' : 'ghost'}
                  onClick={() => setTaskFilter(filter)}
                  className="capitalize"
                >
                  {filter.replace('-', ' ')}
                </Button>
              ))}
            </div>
            <Button onClick={() => setIsTaskModalOpen(true)}>
              <Plus className="h-5 w-5 mr-2" />Add Task
            </Button>
          </div>
        </div>
        <TaskBoard
          tasks={filteredTasks}
          onStatusChange={handleStatusChange}
          onEdit={openEditTaskModal}
          onDelete={handleTaskDelete}
          currentUserId={currentUserId}
          userRole={isAdmin ? 'admin' : 'member'}
        />
      </div>
      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      >
        <TaskForm
          onSubmit={handleTaskFormSubmit}
          members={members}
          projectId={id}
          defaultValues={editingTask || {}}
          isEdit={!!editingTask}
        />
      </Modal>
      <Modal
        isOpen={isEditProjectOpen}
        onClose={() => setIsEditProjectOpen(false)}
        title="Edit Project"
      >
        <ProjectForm
          onSubmit={handleEditProjectSubmit}
          defaultValues={project}
          isEdit
        />
      </Modal>
    </div>
  );
};

export default ProjectDetail;
