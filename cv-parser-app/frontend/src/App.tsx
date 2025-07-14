import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CVUpload from './components/CVUpload';
import CVDisplay from './components/CVDisplay';
import ReviewerPanel from './components/ReviewerPanel';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <h1>CV Parser Application</h1>
        <Switch>
          <Route path="/" exact component={CVUpload} />
          <Route path="/display" component={CVDisplay} />
          <Route path="/review" component={ReviewerPanel} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;