import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <div className="text-center">
        <AlertCircle className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-4 text-9xl font-bold text-primary">404</h1>
        <h2 className="mt-2 text-3xl font-semibold">Page not found</h2>
        <p className="mt-2 text-lg text-gray-600">
          The page you are looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link to="/">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
