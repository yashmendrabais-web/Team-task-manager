import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { ShieldCheck } from 'lucide-react';

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm();
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/');
    }
  }, [auth.isAuthenticated, navigate]);
  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...registerData } = data;
      await auth.register(registerData);
      navigate('/');
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong'
      );
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-400 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 opacity-10 rounded-full blur-3xl"></div>
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl backdrop-blur-sm border border-white/20">
        <div className="mb-8 flex items-center justify-center">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <span className="ml-3 text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">TaskFlow</span>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create an account</h2>
          <p className="mt-2 text-sm text-gray-600">Join us and start managing tasks efficiently</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <Input
            label="Full Name"
            id="name"
            placeholder="John Doe"
            {...register('name', { 
                required: 'Name is required',
                maxLength: { value: 100, message: 'Name cannot exceed 100 characters' }
            })}
            error={errors.name}
          />
          <Input
            label="Email address"
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register('email', { required: 'Email is required' })}
            error={errors.email}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="••••••••"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            error={errors.password}
          />
          <Input
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === getValues('password') || 'Passwords do not match',
            })}
            error={errors.confirmPassword}
          />
          <div className="pt-2">
            <Button type="submit" className="w-full py-3 text-base" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
        </form>
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-200"></div>
          <div className="px-3 text-sm text-gray-500">or</div>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:text-cyan-600 transition-colors">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
