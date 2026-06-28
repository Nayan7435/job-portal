import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../context/useAuth';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axiosInstance.post('/auth/login', formData);
            login(response.data.user, response.data.token);
            navigate('/jobs');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-mist">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 p-8 rounded-lg w-full max-w-md"
      >
        <p className="font-mono text-xs text-amber tracking-widest uppercase mb-2 text-center">
          // welcome_back
        </p>
        <h2 className="font-display text-2xl font-bold text-navy mb-6 text-center">Login</h2>

        {error && (
          <p className="bg-red-50 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md mb-4 text-sm focus:outline-none focus:border-navy transition"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md mb-5 text-sm focus:outline-none focus:border-navy transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-navy text-white py-3 rounded-md font-medium hover:bg-navy/90 disabled:bg-gray-400 transition"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center mt-5 text-sm text-slate">
          Don't have an account?{' '}
          <Link to="/signup" className="text-navy font-medium">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );

};

export default Login;