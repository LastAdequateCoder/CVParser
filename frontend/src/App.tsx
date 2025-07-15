import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import UploadForm from './components/UploadForm';
import CandidateInfo from './components/CandidateInfo';
import CandidateList from './components/CandidateList';
import ParsedCvPage from './components/ParsedCvPage';
import CompareCvPage from './components/CompareCvPage';
import './App.css';

const App: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <header className="main-app-header">
        <span className="header-title" onClick={() => navigate('/')}>Candidate Parser</span>
      </header>
      <div className="app-bg">
        <div className="center-container">
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <div className="card">
                  <UploadForm />
                </div>
                <div className="card">
                  <CandidateList />
                </div>
              </>
            } />
            <Route path="/cv/:id" element={<ParsedCvPage />} />
            <Route path="/cv/:id/compare" element={<CompareCvPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
