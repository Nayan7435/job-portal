import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white sticky top-0 z-10 px-6 py-4 flex justify-between items-center border-b border-gray-200">
      <Link to="/jobs" className="font-display font-bold text-xl text-navy">
        Job<span className="text-amber">Portal</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link
          to="/jobs"
          className="text-sm text-slate hover:text-navy transition"
        >
          Jobs
        </Link>

        {user ? (
          <>
            {user.role === "recruiter" && (
              <Link
                to="/post-job"
                className="text-sm text-slate hover:text-navy transition"
              >
                Post Job
              </Link>
            )}
            <Link
              to="/resume-analyzer"
              className="text-sm text-slate hover:text-navy transition"
            >
              AI Resume Check
            </Link>
            <span className="font-mono text-xs text-slate bg-mist px-3 py-1.5 rounded-full">
              {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-white bg-navy px-4 py-2 rounded-md hover:bg-navy/90 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm text-slate hover:text-navy transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-sm text-white bg-navy px-4 py-2 rounded-md hover:bg-navy/90 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;