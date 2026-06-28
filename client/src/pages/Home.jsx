import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-mist border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <p className="font-mono text-xs text-amber tracking-widest uppercase mb-4">
            // for_developers_and_recruiters
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-navy leading-tight mb-5">
            Ship your career.<br />Not just your code.
          </h1>
          <p className="text-lg text-slate max-w-xl mx-auto mb-10">
            Browse real dev roles, apply in one click, and get instant AI feedback on how your resume stacks up.
          </p>

          <div className="flex justify-center gap-3">
            <Link
              to="/jobs"
              className="bg-navy text-white px-6 py-3 rounded-md font-medium hover:bg-navy/90 transition"
            >
              Browse Jobs
            </Link>
            {!user && (
              <Link
                to="/signup"
                className="bg-white text-navy border border-gray-300 px-6 py-3 rounded-md font-medium hover:border-navy transition"
              >
                Create Account
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
          {[
            { tag: '01', title: 'Browse Jobs', desc: 'Real listings from recruiters, filtered by role, location, and type.' },
            { tag: '02', title: 'Apply Instantly', desc: 'One-click apply with role-based profiles — no repeated forms.' },
            { tag: '03', title: 'AI Resume Check', desc: 'Paste a job description, get a match score and gap analysis in seconds.' },
          ].map((item) => (
            <div key={item.tag} className="bg-white p-8">
              <span className="font-mono text-xs text-amber">{item.tag}</span>
              <h3 className="font-display font-bold text-navy mt-2 mb-2">{item.title}</h3>
              <p className="text-sm text-slate">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;