import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import GamesPage from './pages/Gamepage';
import React from 'react';
import IdentificacionUnidadesJuego from './componets/IdentificacionUnidadesJuego';
import DivisionGame from './pages/DivisionGame'; 

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/game/:operation" element={<IdentificacionUnidadesJuego />} />
        <Route path="/Division" element={<DivisionGame/>} />  
      </Routes>
    </Router>
  );
}

export default App;
