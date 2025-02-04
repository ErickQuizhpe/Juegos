import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GamesPage from './pages/GamesPage';
import React from 'react';
import OperacionesAgrupacion from './pages/OperacionesAgrupacion';
import MinusPage from './pages/MinusPage';
import MultiplicationPage from './pages/MultiplicationPage';
import DivisionPage from './pages/DivisionPage';
import AdditionPage from './pages/AdditionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/AdditionPage" element={<AdditionPage />} />
        <Route path="/MinusPage" element={<MinusPage />} />
        <Route path="/Multiplicaciones" element={<MultiplicationPage />} />
        <Route path="/DivisionPage" element={<DivisionPage />} />
        <Route path="/OperacionesAgrupacion" element={<OperacionesAgrupacion />} />
      </Routes>
    </Router>
  );
}

export default App;
