// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from '../src/components/LandingPage';
import Dashboard from './components/Dashboard';
import AvatarCreation from './components/AvatarCreation';
import Playground from './components/Playground';
import Privacy from './components/Privacy';
import Terms from './components/Terms';

function App() {
    console.log("App component is rendering");

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-avatar" element={<AvatarCreation />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;