import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/useAuth";
import Spinner from "../components/Spinner";

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applyStatus, setApplyStatus] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axiosInstance.get(`/jobs/get-job-id/${id}`);
        setJob(response.data.job);
      } catch (err) {
        setError("Failed to load job details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    setApplyStatus("");
    try {
      await axiosInstance.post(`/jobs/apply-job/${id}`);
      setApplyStatus("Applied successfully!");
    } catch (err) {
      setApplyStatus(err.response?.data?.message || "Failed to apply");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }

  if (!job) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold">{job.title}</h2>
        <p className="text-gray-600 mt-1">
          {job.company} - {job.location}
        </p>
        <p className="text-gray-800 mt-2 font-semibold">
          ₹{job.salary.toLocaleString()} / year
        </p>
        <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
          {job.jobType}
        </span>

        <p className="mt-4 text-gray-700">{job.description}</p>

        <p className="mt-4 text-sm text-gray-500">
          Posted by: {job.postedBy?.name} ({job.postedBy?.email})
        </p>

        {user?.role === "jobseeker" && (
          <div className="mt-6">
            <button
              onClick={handleApply}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Apply Now
            </button>
            {applyStatus && (
              <p className="mt-2 text-sm text-gray-700">{applyStatus}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;