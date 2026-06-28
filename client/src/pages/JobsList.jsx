import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

const JobsList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axiosInstance.get('/jobs/get-all-jobs');
                setJobs(response.data.jobs);
            } catch (err) {
                setError('Failed to load jobs');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if(loading){
        return <Spinner />;
    }

    if(error){
        return <p className="text-center mt-10 text-red-600">{error}</p>;
    }

    return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Available Jobs</h2>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <Link
              to={`/jobs/${job._id}`}
              key={job._id}
              className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-gray-600">{job.company} - {job.location}</p>
              <p className="text-gray-800 mt-2">₹{job.salary.toLocaleString()} / year</p>
              <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                {job.jobType}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsList;