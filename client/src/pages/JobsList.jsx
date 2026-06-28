import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get("/jobs/get-all-jobs");
        setJobs(response.data.jobs);
      } catch (err) {
        setError("Failed to load jobs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="font-display text-2xl font-bold text-navy mb-6">Available Jobs</h2>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <Link
              to={`/jobs/${job._id}`}
              key={job._id}
              className="flex bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-navy/30 hover:shadow-sm transition-all duration-200"
            >
              <div className="w-1.5 bg-amber"></div>
              <div className="flex-1 p-5 flex justify-between items-start">
                <div>
                  <h3 className="font-display font-bold text-navy">
                    {job.title}
                  </h3>
                  <p className="text-sm text-slate mt-1">
                    {job.company} • {job.location}
                  </p>
                  <p className="font-mono text-sm text-navy mt-3">
                    ₹{job.salary.toLocaleString()} / yr
                  </p>
                </div>
                <span className="font-mono text-xs text-amber bg-amber/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                  {job.jobType}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsList;