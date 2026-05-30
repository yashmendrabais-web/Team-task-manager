import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Briefcase, Users, Calendar } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import { useAuth } from '../../hooks/useAuth';
import Badge from '../common/Badge';
import Button from '../common/Button';

const ProjectCard = React.memo(({ project, onDelete }) => {
  const { user } = useAuth();
  const { _id, id, name, description, my_role, task_count, member_count, created_at } = project;
  const projectId = _id ?? id;
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this project?')) {
      onDelete(projectId);
    }
  };
  return (
    <Link to={`/projects/${projectId}`} className="block group">
      <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 relative border border-gray-100 hover:border-blue-200 hover:scale-105 hover:-translate-y-2">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-cyan-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{name}</h3>
              <div className="flex items-center mt-2">
                <div className="h-1 w-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge color={my_role === 'admin' ? 'primary' : 'info'}>
                {my_role}
              </Badge>
              {my_role === 'admin' && (
                <Button
                  onClick={handleDelete}
                  variant="danger"
                  size="sm"
                  className="p-2 h-auto"
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-6 h-10 overflow-hidden line-clamp-2 group-hover:text-gray-700">
            {description}
          </p>
          <div className="border-t border-gray-200 pt-4 flex flex-wrap gap-4 justify-between items-center text-sm text-gray-600">
            <div className="flex items-center hover:text-blue-600 transition-colors">
              <Briefcase size={16} className="mr-2" />
              <span className="font-medium">{task_count}</span>
              <span className="ml-1">Tasks</span>
            </div>
            <div className="flex items-center hover:text-green-600 transition-colors">
              <Users size={16} className="mr-2" />
              <span className="font-medium">{member_count}</span>
              <span className="ml-1">Members</span>
            </div>
            <div className="flex items-center hover:text-purple-600 transition-colors">
              <Calendar size={16} className="mr-2" />
              <span>{formatDate(created_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});

export { ProjectCard };
export default ProjectCard;
