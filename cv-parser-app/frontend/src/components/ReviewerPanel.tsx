import React from 'react';

const ReviewerPanel: React.FC<{ candidates: any[] }> = ({ candidates }) => {
    return (
        <div className="reviewer-panel">
            <h2>Reviewer Panel</h2>
            {candidates.length === 0 ? (
                <p>No candidates to review.</p>
            ) : (
                <ul>
                    {candidates.map((candidate, index) => (
                        <li key={index}>
                            <h3>{candidate.name}</h3>
                            <p>Email: {candidate.email}</p>
                            <p>Experience: {candidate.experience} years</p>
                            <p>Skills: {candidate.skills.join(', ')}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReviewerPanel;