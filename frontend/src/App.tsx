import React, { useCallback, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import UploadForm from './components/UploadForm';
import CandidateInfo from './components/CandidateInfo';
import CandidateList from './components/CandidateList';
import ParsedCvPage from './components/ParsedCvPage';
import CompareCvPage from './components/CompareCvPage';
import './App.css';
import { getAllCandidates } from './api/cvApi';
import type { Candidate } from './types/Candidate';

const App: React.FC = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const refreshCandidates = useCallback(() => {
    getAllCandidates().then(setCandidates);
  }, []);

  React.useEffect(() => {
    refreshCandidates();
  }, [refreshCandidates]);

  return (
    <>
      <header className="main-app-header">
        <span className="header-title" onClick={() => navigate('/')}>Candidate Parser</span>
      </header>
      <div className="app-bg">
        <div className="center-container">
          <Header />
          <div className="card" style={{ marginBottom: 0 }}>
            <UploadForm onUploadSuccess={refreshCandidates} />
          </div>
          <div className="card candidate-list-scrollable" style={{ marginTop: '1rem', flexGrow: 1, width: '100%' }}>
            <CandidateList candidates={candidates} refresh={refreshCandidates} />
          </div>
          <Routes>
            <Route path="/cv/:id" element={<ParsedCvPage />} />
            <Route path="/cv/:id/compare" element={<CompareCvPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
