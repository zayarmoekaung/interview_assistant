'use client';

import { useState } from 'react';
import { encodeBase64 } from '@/helpers/base64.helper';
import { makePostRequest } from '@/helpers/axios/request.helper';
import { decodeJsonFromMarkdown } from '@/helpers/json.helper';
export default function Home() {
  const [modelType, setModelType] = useState<'chatgpt' | 'gemini'>('chatgpt');
  const [jd, setJd] = useState('');
  const [resume, setResume] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnalysisLoading(true);
    setAnalysis(null);
    try {
      const url = '/api/analyze'
      const payload = {
        model:{
          type: modelType,
          name: modelType === 'chatgpt' ? 'gpt-4' : 'gemini-2.5-flash',
        },
        jobDescription: encodeBase64(jd),
        resume: encodeBase64(resume),
      };
      const res = await makePostRequest(url, payload);
      const data = decodeJsonFromMarkdown(res.response);
      console.log('Analysis Response:', data);
      setAnalysis(data);
    } catch (error) {
      setAnalysis({ error: 'Error: ' + (error as Error).message });
    } finally {
      setAnalysisLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Interview Assistant</h1>

      <h2 className="text-xl font-bold mt-8 mb-4">Resume-JD Matcher</h2>
      <form onSubmit={handleAnalyze}>
        <label className="block mb-2">
          Select Model:
          <select
            value={modelType}
            onChange={(e) => setModelType(e.target.value as 'chatgpt' | 'gemini')}
            className="ml-2 p-1 border"
          >
            <option value="chatgpt">ChatGPT (OpenAI)</option>
            <option value="gemini">Gemini (Google)</option>
          </select>
        </label>
        <textarea
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Paste the Job Description here"
          className="w-full p-2 border mb-2"
          rows={6}
        />
        <textarea
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          placeholder="Paste your Resume here (text format)"
          className="w-full p-2 border mb-2"
          rows={10}
        />
        <button type="submit" disabled={analysisLoading} className="bg-green-500 text-white p-2 rounded">
          {analysisLoading ? 'Analyzing...' : 'Analyze Match'}
        </button>
      </form>

      {analysis && !analysis.error && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="font-bold">Overall Match: {analysis.overall_match_percentage}%</h3>
          <table className="w-full mt-2 border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Field</th>
                <th className="border p-2">Match %</th>
                <th className="border p-2">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {analysis.field_matches.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="border p-2">{item.field}</td>
                  <td className="border p-2">{item.match_percentage}%</td>
                  <td className="border p-2">{item.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="font-bold mt-4">General Feedback:</h3>
          <p>{analysis.general_feedback}</p>
        </div>
      )}
      {analysis?.error && <p className="mt-4 text-red-500">{analysis.error}</p>}
    </div>
  );
}