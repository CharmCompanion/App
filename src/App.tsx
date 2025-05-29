import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CharmProvider } from './CharmContext';

import TopBar from './components/TopBar/TopBar';

// Pages
import Nightwave from './pages/activities/Nightwave';
import WorldstateEvents from './pages/events/WorldstateEvents';
import Notes from './pages/tools/Notes';
import Sheets from './pages/tools/Sheets';
import MasteryTracker from './pages/tools/MasteryTracker';
import Hunts from './pages/tools/Hunts';
import Foundry from './pages/tools/Foundry';
import Login from './pages/Login';
import Map from './pages/Map';

import './styles/shared.css';

const App = () => {
  return (
    <CharmProvider>
      <Router>
        <TopBar />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Navigate to="/activities/nightwave" />} />
            <Route path="/activities/nightwave" element={<Nightwave />} />
            <Route path="/events" element={<WorldstateEvents />} />
            <Route path="/tools/notes" element={<Notes />} />
            <Route path="/tools/sheets" element={<Sheets />} />
            <Route path="/tools/mastery-tracker" element={<MasteryTracker />} />
            <Route path="/tools/hunts" element={<Hunts />} />
            <Route path="/tools/foundry" element={<Foundry />} />
            <Route path="/login" element={<Login />} />
            <Route path="/map" element={<Map />} />
          </Routes>
        </main>
      </Router>
    </CharmProvider>
  );
};

export default App;
