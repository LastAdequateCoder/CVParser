import React from 'react';

interface CVDisplayProps {
    candidateData: {
        name: string;
        email: string;
        phone: string;
        experience: string[];
        education: string[];
        skills: string[];
    } | null;
}

const CVDisplay: React.FC<CVDisplayProps> = ({ candidateData }) => {
    if (!candidateData) {
        return <div>No CV data available.</div>;
    }

    return (
        <div className="cv-display">
            <h2>{candidateData.name}</h2>
            <p>Email: {candidateData.email}</p>
            <p>Phone: {candidateData.phone}</p>
            <h3>Experience</h3>
            <ul>
                {candidateData.experience.map((job, index) => (
                    <li key={index}>{job}</li>
                ))}
            </ul>
            <h3>Education</h3>
            <ul>
                {candidateData.education.map((edu, index) => (
                    <li key={index}>{edu}</li>
                ))}
            </ul>
            <h3>Skills</h3>
            <ul>
                {candidateData.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
            </ul>
        </div>
    );
};

export default CVDisplay;