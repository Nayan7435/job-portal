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
    <div className="max-w-xl mx-auto mt-10 px-4 pb-16">
      <p className="font-mono text-xs text-amber tracking-widest uppercase mb-2">
        // recruiter_only
      </p>
      <h2 className="font-display text-2xl font-bold text-navy mb-6">Post a New Job</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-lg p-8"
      >
        {error && (
          <p className="bg-red-50 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <label className="block text-sm font-medium text-navy mb-1">Job Title</label>
        <input
          type="text"
          name="title"
          placeholder="e.g. Frontend Developer"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md mb-5 text-sm focus:outline-none focus:border-navy transition"
        />

        <label className="block text-sm font-medium text-navy mb-1">Job Description</label>
        <textarea
          name="description"
          placeholder="Responsibilities, requirements, etc."
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-md mb-5 text-sm focus:outline-none focus:border-navy transition"
        />

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-sm font-medium text-navy mb-1">Company</label>
            <input
              type="text"
              name="company"
              placeholder="Company name"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-navy transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy mb-1">Location</label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Ahmedabad"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-navy transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-navy mb-1">Salary (per year)</label>
            <input
              type="number"
              name="salary"
              placeholder="e.g. 600000"
              value={formData.salary}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md text-sm font-mono focus:outline-none focus:border-navy transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy mb-1">Job Type</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-navy transition"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-navy text-white py-3 rounded-md font-medium hover:bg-navy/90 disabled:bg-gray-400 transition"
        >
          {loading ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </div>
  );
};

export default PostJob;