import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { useProjects } from '../../hooks/useProjects';
import { useAuth } from '../../hooks/useAuth';
import { Loader } from '../../components/common/Loader';
import { ProjectCard } from '../../components/projects/ProjectCard';
import { Modal } from '../../components/common/Modal';
import { ProjectForm } from '../../components/projects/ProjectForm';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Plus, Folder } from 'lucide-react';

const ROLE_FILTERS = ['all', 'admin', 'member'];
export const Projects = () => {
  const {
    projects,
    loading,
    error,
    loadProjects,
    addProject,
    removeProject,
  } = useProjects();
  const { user } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredProjects = useMemo(() => {
    if (roleFilter === 'all') {
      return projects;
    }
    return projects.filter((project) => project.my_role === roleFilter);
  }, [projects, roleFilter]);
  useEffect(() => {
    loadProjects();
  }, []);
  const handleCreateProject = async (data) => {
    try {
      await addProject(data);
      toast.success('Project created successfully!');
      setIsCreateModalOpen(false);
      await loadProjects();
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
        err?.message ||
        'Something went wrong'
      );
    }
  };
  const handleDelete = useCallback(
    async (id) => {
      if (window.confirm('Are you sure you want to delete this project?')) {
        try {
          await removeProject(id);
          toast.success('Project deleted successfully');
        } catch (err) {
          toast.error(
            err?.response?.data?.message ||
            err?.message ||
            'Something went wrong'
          );
        }
      }
    },
    [removeProject]
  );
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-red-50 rounded-xl border border-red-200 m-4">
        <Folder className="h-16 w-16 text-red-400 mb-4" />
        <p className="text-lg font-semibold text-red-900">Error: {error}</p>
        <Button onClick={loadProjects} variant="danger" className="mt-4">
          Retry
        </Button>
      </div>
    );
  }
  return (
    <div className="page-container">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <Folder className="h-10 w-10 text-blue-600" />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">My Projects</span>
          </h1>
          <p className="mt-2 text-gray-600">Manage all your projects in one place</p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          variant="primary"
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <Plus className="h-5 w-5" />
          New Project
        </Button>
      </div>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        {ROLE_FILTERS.map((filter) => (
          <Button
            key={filter}
            type="button"
            variant={roleFilter === filter ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setRoleFilter(filter)}
            className="capitalize"
          >
            {filter === 'all' ? 'All Projects' : `${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
          </Button>
        ))}
        <span className="ml-auto px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold">{filteredProjects.length} Projects</span>
      </div>
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const projectId = project._id ?? project.id;
            return (
              <ProjectCard
                key={projectId}
                project={project}
                onDelete={() => handleDelete(projectId)}
                currentUser={user}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-dashed border-blue-200">
          <Folder className="mx-auto h-20 w-20 text-blue-300 mb-4" />
          <h3 className="text-2xl font-bold text-gray-900">
            {roleFilter === 'all' ? 'No projects yet' : `No ${roleFilter} projects`}
          </h3>
          <p className="mt-2 text-gray-600 mb-6">
            Get started by creating your first project or join existing ones.
          </p>
          <Button onClick={() => setIsCreateModalOpen(true)} variant="primary">
            <Plus className="h-4 w-4 mr-2" />
            Create First Project
          </Button>
        </div>
      )}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Project"
        size="lg"
      >
        <ProjectForm onSubmit={handleCreateProject} />
      </Modal>
    </div>
  );
};

export default Projects;

