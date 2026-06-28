import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Home = () => {
    const { user } = useAuth();

    return (
    <div className="min-h-[calc(100vh-72px)] bg-linear-to-br from-blue-50 to-white flex items-center">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Find Your Next <span className="text-blue-600">Opportunity</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect with top recruiters, discover jobs that match your skills, and let AI help you craft the perfect application.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/jobs"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Browse Jobs
          </Link>

          {!user && (
            <Link
              to="/signup"
              className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition"
            >
              Get Started
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-blue-600 text-2xl mb-2">🔍</div>
            <h3 className="font-semibold mb-1">Browse Jobs</h3>
            <p className="text-sm text-gray-600">Explore opportunities posted by verified recruiters across roles and locations.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-blue-600 text-2xl mb-2">⚡</div>
            <h3 className="font-semibold mb-1">Apply Instantly</h3>
            <p className="text-sm text-gray-600">One-click apply with role-based profiles for job seekers and recruiters.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-blue-600 text-2xl mb-2">🤖</div>
            <h3 className="font-semibold mb-1">AI Resume Check</h3>
            <p className="text-sm text-gray-600">Get instant AI-powered feedback on how well your resume matches a job.</p>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Home;