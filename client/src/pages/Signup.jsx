import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../context/useAuth';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'jobseeker',
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
            const response = await axiosInstance.post('/auth/signup', formData);
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
          // create_account
        </p>
        <h2 className="font-display text-2xl font-bold text-navy mb-6 text-center">Sign Up</h2>

        {error && (
          <p className="bg-red-50 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md mb-4 text-sm focus:outline-none focus:border-navy transition"
        />

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
          minLength={6}
          className="w-full p-3 border border-gray-300 rounded-md mb-4 text-sm focus:outline-none focus:border-navy transition"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md mb-5 text-sm focus:outline-none focus:border-navy transition"
        >
          <option value="jobseeker">Job Seeker</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-navy text-white py-3 rounded-md font-medium hover:bg-navy/90 disabled:bg-gray-400 transition"
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>

        <p className="text-center mt-5 text-sm text-slate">
          Already have an account?{' '}
          <Link to="/login" className="text-navy font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );

};

export default Signup;