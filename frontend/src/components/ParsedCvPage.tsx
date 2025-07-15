import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Candidate } from '../types/Candidate';
import CandidateInfo from './CandidateInfo';

const API_BASE = 'http://localhost:8080/api/cv';

const ParsedCvPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/candidate/${id}`)
      .then(res => res.ok ? res.json() : Promise.reject('Not found'))
      .then(setCandidate)
      .catch(() => setError('Candidate not found.'));
  }, [id]);

  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!candidate) return <div>Loading...</div>;

  return (
    <div className="card">
      <CandidateInfo candidate={candidate} />
      <button style={{ marginTop: '2rem' }} onClick={() => navigate(`/cv/${id}/compare`)}>
        Compare with Previous Uploads
      </button>
    </div>
  );
};

export default ParsedCvPage; 