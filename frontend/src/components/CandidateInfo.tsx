import type { Candidate } from '../types/Candidate';

const CandidateInfo = ({ candidate }: { candidate: Candidate }) => (
  <div className="candidate-info">
    <h2>Parsed Candidate</h2>
    <p><strong>Name:</strong> {candidate.name}</p>
    <p><strong>Email:</strong> {candidate.email}</p>
    <p><strong>Phone:</strong> {candidate.phone}</p>
    <p><strong>Education:</strong> {candidate.education}</p>
    <p><strong>Experience:</strong> {candidate.experience}</p>
    <p><strong>Skills:</strong> {candidate.skills}</p>
  </div>
);

export default CandidateInfo; 