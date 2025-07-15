import React, { useRef, useState } from 'react';
import { uploadCv } from '../api/cvApi';
import type { Candidate } from '../types/Candidate';
import { useNavigate } from 'react-router-dom';

const UploadForm: React.FC = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const file = fileInput.current?.files?.[0];
    if (!file) {
      setError('Please select a file.');
      return;
    }
    setLoading(true);
    try {
      const candidate = await uploadCv(file);
      if (fileInput.current) fileInput.current.value = '';
      navigate(`/cv/${candidate.id}`);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} style={{ margin: '2rem 0' }}>
      <input type="file" ref={fileInput} accept=".pdf,.doc,.docx" />
      <button type="submit" disabled={loading} style={{ marginLeft: '1rem' }}>
        {loading ? 'Uploading...' : 'Upload CV'}
      </button>
      {error && <div style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>}
    </form>
  );
};

export default UploadForm; 