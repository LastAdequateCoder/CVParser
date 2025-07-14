import React, { useState } from 'react';
import axios from 'axios';

const CVUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!file) {
            setMessage('Please upload a CV file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/cv/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('CV uploaded successfully!');
        } catch (error) {
            setMessage('Error uploading CV. Please try again.');
        }
    };

    return (
        <div>
            <h2>Upload CV</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CVUpload;