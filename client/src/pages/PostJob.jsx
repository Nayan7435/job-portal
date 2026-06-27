import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const PostJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        company: '',
        location: '',
        salary: '',
        jobType: 'Full-time',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await axiosInstance.post('/jobs/create-job', {
                ...formData,
                salary: Number(formData.salary),
            });
            navigate('/jobs');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to post job');
        } finally {
            setLoading(false);
        }
    };
    
    return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold mb-6">Post a New Job</h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full p-2 border rounded mb-4"
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary (per year)"
          value={formData.salary}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </div>
  );
};

export default PostJob;