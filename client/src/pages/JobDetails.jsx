import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../context/useAuth';
import Spinner from '../components/Spinner';

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applyStatus, setApplyStatus] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axiosInstance.get(`/jobs/get-job-id/${id}`);
        setJob(response.data.job);
      } catch (err) {
        setError('Failed to load job details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    setApplyStatus('');
    try {
      await axiosInstance.post(`/jobs/apply-job/${id}`);
      setApplyStatus('Applied successfully!');
    } catch (err) {
      setApplyStatus(err.response?.data?.message || 'Failed to apply');
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!job) return null;

  return (
    <div className="bg-mist min-h-[calc(100vh-72px)]">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="h-2 bg-amber"></div>

          <div className="p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl font-bold text-navy">{job.title}</h2>
                <p className="text-slate mt-2">{job.company} • {job.location}</p>
              </div>
              <span className="font-mono text-xs text-amber bg-amber/10 px-3 py-1.5 rounded-full whitespace-nowrap">
                {job.jobType}
              </span>
            </div>

            <p className="font-mono text-xl text-navy font-semibold mt-5">
              ₹{job.salary.toLocaleString()}<span className="text-slate text-sm font-sans"> / year</span>
            </p>

            <div className="h-px bg-gray-100 my-6"></div>

            <p className="font-mono text-xs uppercase tracking-widest text-slate mb-2">Description</p>
            <p className="text-slate leading-relaxed">{job.description}</p>

            <div className="h-px bg-gray-100 my-6"></div>

            <p className="text-sm text-slate">
              Posted by <span className="text-navy font-medium">{job.postedBy?.name}</span> ({job.postedBy?.email})
            </p>

            {user?.role === 'jobseeker' && (
              <div className="mt-7">
                <button
                  onClick={handleApply}
                  className="bg-navy text-white px-6 py-3 rounded-md font-medium hover:bg-navy/90 transition"
                >
                  Apply Now
                </button>
                {applyStatus && (
                  <p className="mt-3 text-sm text-slate">{applyStatus}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;