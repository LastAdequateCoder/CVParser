import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Candidate } from '../types/Candidate';
import CandidateInfo from './CandidateInfo';

const API_BASE = 'http://localhost:8080/api/cv';

const CompareCvPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [current, setCurrent] = useState<Candidate | null>(null);
  const [previous, setPrevious] = useState<Candidate[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/candidate/${id}`)
      .then(res => res.ok ? res.json() : Promise.reject('Not found'))
      .then(setCurrent)
      .catch(() => setError('Current candidate not found.'));
    fetch(`${API_BASE}/compare/${id}`)
      .then(res => res.ok ? res.json() : Promise.reject('Not found'))
      .then(setPrevious)
      .catch(() => {});
  }, [id]);

  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!current) return <div>Loading...</div>;

  return (
    <div>
      <div className="card">
        <h2>Current CV</h2>
        <CandidateInfo candidate={current} />
      </div>
      <div className="card">
        <h2>Previous Uploads</h2>
        {previous.length === 0 ? (
          <div>No previous uploads found.</div>
        ) : (
          previous.map(c => <CandidateInfo key={c.id} candidate={c} />)
        )}
      </div>
      <button style={{ marginTop: '2rem' }} onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default CompareCvPage; 