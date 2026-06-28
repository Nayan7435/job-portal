import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const ResumeAnalyzer = () => {
    const [resumeText, setResumeText] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAnalyze = async (e) => {
        e.preventDefault();
        setError('');
        setAnalysis(null);
        setLoading(true);

        try {
            const response = await axiosInstance.post('/ai/analyze-resume', {
                resumeText,
                jobDescription,
            });
            setAnalysis(response.data.analysis);
        } catch (err) {
            setError(err.response?.data?.message || 'Analyze failed');
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4 pb-16">
      <p className="font-mono text-xs text-amber tracking-widest uppercase mb-2">
        // ai_powered
      </p>
      <h2 className="font-display text-2xl font-bold text-navy mb-6">Resume Analyzer</h2>

      <form onSubmit={handleAnalyze} className="bg-white border border-gray-200 rounded-lg p-8">
        {error && (
          <p className="bg-red-50 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <label className="block text-sm font-medium text-navy mb-1">Your Resume</label>
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          required
          rows={6}
          className="w-full p-3 border border-gray-300 rounded-md mb-5 text-sm focus:outline-none focus:border-navy transition"
          placeholder="Paste your resume content here..."
        />

        <label className="block text-sm font-medium text-navy mb-1">Job Description</label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
          rows={6}
          className="w-full p-3 border border-gray-300 rounded-md mb-6 text-sm focus:outline-none focus:border-navy transition"
          placeholder="Paste the job description here..."
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-navy text-white py-3 rounded-md font-medium hover:bg-navy/90 disabled:bg-gray-400 transition"
        >
          {loading ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </form>

      {analysis && (
        <div className="bg-white border border-gray-200 rounded-lg p-8 mt-6">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
            <span className="font-mono text-xs text-slate uppercase tracking-widest">Match Score</span>
            <span className="font-display text-3xl font-bold text-navy">{analysis.matchScore}%</span>
          </div>

          <div className="mb-5">
            <h4 className="font-mono text-xs uppercase tracking-widest text-amber mb-2">Strengths</h4>
            <ul className="space-y-1">
              {analysis.strengths.map((item, idx) => (
                <li key={idx} className="text-sm text-slate flex gap-2">
                  <span className="text-amber">+</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-5">
            <h4 className="font-mono text-xs uppercase tracking-widest text-amber mb-2">Missing Skills</h4>
            <ul className="space-y-1">
              {analysis.missingSkills.map((item, idx) => (
                <li key={idx} className="text-sm text-slate flex gap-2">
                  <span className="text-amber">−</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-amber mb-2">Suggestions</h4>
            <ul className="space-y-1">
              {analysis.suggestions.map((item, idx) => (
                <li key={idx} className="text-sm text-slate flex gap-2">
                  <span className="text-amber">→</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;