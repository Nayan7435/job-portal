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

  if (loading) return <Spinner />;

  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }

  return (
    <div className="bg-mist min-h-[calc(100vh-72px)]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <p className="font-mono text-xs text-amber tracking-widest uppercase mb-2">
          // {jobs.length} open_roles
        </p>
        <h2 className="font-display text-3xl font-bold text-navy mb-8">
          Available Jobs
        </h2>

        {jobs.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-10 text-center">
            <p className="text-slate">No jobs posted yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Link
                to={`/jobs/${job._id}`}
                key={job._id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-navy/30 hover:shadow-md transition-all duration-200 flex flex-col"
              >
                <div className="h-2 bg-amber"></div>
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-navy text-xl">
                    {job.title}
                  </h3>
                  <p className="text-slate mt-2">{job.company}</p>
                  <p className="text-sm text-slate mt-0.5">{job.location}</p>

                  <p className="text-sm text-slate mt-4 line-clamp-3 flex-1">
                    {job.description}
                  </p>

                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
                    <p className="font-mono text-navy font-semibold">
                      ₹{job.salary.toLocaleString()}
                      <span className="text-slate text-xs">/yr</span>
                    </p>
                    <span className="font-mono text-xs text-amber bg-amber/10 px-3 py-1.5 rounded-full">
                      {job.jobType}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsList;