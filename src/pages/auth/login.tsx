import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { loginSchema } from '@/validate/yup';

const dummyUsers = [
    { email: 'test@example.com', password: 'password123' },
    { email: 'user@example.com', password: 'securepass' },
  ];

const Login = () => {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
    shouldFocusError: true,
  });

  const loginEmail = (email:any) => {
    sessionStorage.setItem('userEmail', email);
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await new Promise<{ success: boolean }>((resolve) => {
        setTimeout(() => {
          const user = dummyUsers.find(
            (user) => user.email === data.email && user.password === data.password
          );
  
          if (user) {
            resolve({ success: true });
          } else {
            resolve({ success: false });
          }
        }, 1000); 
      });
  
      if (response.success) {
        loginEmail(data.email);
        router.push('/');
        toast.success('Login successful');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
    }
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-full flex items-center justify-center p-10">
        <div className="p-8 w-96 border-4 border-blue-600 rounded-xl">
          <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 pt-2">Email:</label>
              <input
                type="text"
                {...register('email')}
                placeholder="Enter your email"
                className={`border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 pt-2">Password:</label>
              <input
                type="password"
                {...register('password')}
                placeholder="Enter your password"
                className={`border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${errors.password ? 'border-red-500' : ''}`}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <div className="flex justify-center pt-3">
              <button
                type="submit"
                className="bg-blue-900 hover:bg-blue-700 text-white text-lg font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline mx-auto"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
