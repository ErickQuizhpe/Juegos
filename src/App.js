import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import GamesPage from './pages/Gamepage';
import React from 'react';
import IdentificacionUnidadesJuego from './componets/IdentificacionUnidadesJuego';
import OperacionesAgrupacion from './pages/OperacionesAgrupaciones';
import MinusPage from './pages/MinusPage';
import Multiplicaciones from './pages/Multiplicaciones';
import DivisionPage from './pages/DivisionPage';
import AdditionPage from './pages/AdditionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/game/:operation" element={<IdentificacionUnidadesJuego />} />

        <Route
          path="/OperacionesAgrupaciones"
          element={<OperacionesAgrupacion />}
        />
        <Route path="/MinusPage" element={<MinusPage />}></Route>
        <Route path="/Multiplicaciones" element={<Multiplicaciones />} />
        <Route path="/DivisionPage" element={<DivisionPage />}></Route>
        <Route path="/AdditionPage" element={<AdditionPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
