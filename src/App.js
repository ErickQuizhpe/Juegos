import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import GamesPage from './pages/Gamepage';
import React from 'react';
import IdentificacionUnidadesJuego from './componets/IdentificacionUnidadesJuego';

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/game/:operation" element={<IdentificacionUnidadesJuego />} />
      </Routes>
    </Router>
  );
}

export default App;
