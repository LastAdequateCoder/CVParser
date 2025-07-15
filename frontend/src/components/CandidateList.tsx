import { useEffect, useState } from 'react';
import { getAllCandidates } from '../api/cvApi';
import type { Candidate } from '../types/Candidate';

const CandidateList = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllCandidates()
      .then(setCandidates)
      .catch(err => setError(err.message || 'Failed to fetch candidates'));
  }, []);

  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!candidates.length) return <div>No candidates found.</div>;

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>All Parsed Candidates</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Education</th><th>Experience</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.education}</td>
              <td>{c.experience}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateList; 