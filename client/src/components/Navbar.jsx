import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Navbar = () => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/jobs" className="text-xl font-bold text-blue-600">
        JobPortal
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/jobs" className="text-gray-700 hover:text-blue-600">
          Jobs
        </Link>

        {user ? (
          <>
            {user.role === 'recruiter' && (
              <Link to="/post-job" className="text-gray-700 hover:text-blue-600">
                Post Job
              </Link>
            )}
            <span className="text-sm text-gray-500">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link to="/signup" className="text-gray-700 hover:text-blue-600">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );

};

export default Navbar;