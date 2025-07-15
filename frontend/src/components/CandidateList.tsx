import type { Candidate } from '../types/Candidate';

interface CandidateListProps {
  candidates: Candidate[];
  refresh: () => void;
}

const CandidateList = ({ candidates }: CandidateListProps) => {
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