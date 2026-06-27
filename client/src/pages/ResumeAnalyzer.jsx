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
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6">AI Resume Analyzer</h2>

      <form onSubmit={handleAnalyze} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block font-medium mb-1">Your Resume (paste as text)</label>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            required
            rows={6}
            className="w-full p-2 border rounded"
            placeholder="Paste your resume content here..."
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
            rows={6}
            className="w-full p-2 border rounded"
            placeholder="Paste the job description here..."
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </form>

      {analysis && (
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h3 className="text-xl font-bold mb-4">
            Match Score: <span className="text-blue-600">{analysis.matchScore}%</span>
          </h3>

          <div className="mb-4">
            <h4 className="font-semibold text-green-700">Strengths</h4>
            <ul className="list-disc ml-5 text-gray-700">
              {analysis.strengths.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-red-700">Missing Skills</h4>
            <ul className="list-disc ml-5 text-gray-700">
              {analysis.missingSkills.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-blue-700">Suggestions</h4>
            <ul className="list-disc ml-5 text-gray-700">
              {analysis.suggestions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;