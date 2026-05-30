import { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { FolderKanban, CheckSquare, Clock, AlertTriangle } from 'lucide-react';

import {
  fetchDashboard,
  selectDashboardStats,
  selectDashboardLoading,
  selectDashboardError,
  selectRecentTasks,
  selectOverdueList,
} from '../features/dashboard/dashboardSlice';
import StatsCard from '../components/dashboard/StatsCard';
import RecentTasks from '../components/dashboard/RecentTasks';
import OverdueTasks from '../components/dashboard/OverdueTasks';
import Loader from '../components/common/Loader';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};
const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const stats = useSelector(selectDashboardStats);
  const recentTasks = useSelector(selectRecentTasks);
  const overdueTasks = useSelector(selectOverdueList);
  const loading = useSelector(selectDashboardLoading);
  const error = useSelector(selectDashboardError);
  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);
  const handleRetry = useCallback(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  const greeting = useMemo(() => getGreeting(), []);
  const statsCards = useMemo(() => [
    {
      title: 'Total Projects',
      value: stats.total_projects,
      icon: FolderKanban,
      color: 'primary',
    },
    {
      title: 'Total Tasks',
      value: stats.total_tasks,
      icon: CheckSquare,
      color: 'success',
    },
    {
      title: 'My Tasks',
      value: stats.my_tasks,
      icon: Clock,
      color: 'warning',
      description: 'Assigned to me',
    },
    {
      title: 'Overdue',
      value: stats.overdue_tasks,
      icon: AlertTriangle,
      color: 'danger',
      description: 'Need attention',
    },
  ], [stats]);
  if (loading) {
    return <Loader fullPage />;
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <div className="bg-red-50 rounded-xl p-8 border border-red-200">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto" />
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            Something went wrong
          </h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <Button onClick={handleRetry} className="mt-6" variant="danger">
            Try Again
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="page-container">
      <header className="mb-8">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              {greeting}, <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{user?.name}</span>! 👋
            </h1>
            <p className="mt-2 text-gray-600">Here's your dashboard overview</p>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            description={stat.description}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentTasks tasks={recentTasks} />
        </div>
        <div className="lg:col-span-1">
          <OverdueTasks tasks={overdueTasks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

