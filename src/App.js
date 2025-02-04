import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import GamesPage from './pages/Gamepage';
import React from 'react';
import IdentificacionUnidadesJuego from './componets/IdentificacionUnidadesJuego';

function App() {
  return (
    <Router>
<<<<<<< Updated upstream
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/game/:operation" element={<IdentificacionUnidadesJuego />} />
=======
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
>>>>>>> Stashed changes
      </Routes>
    </Router>
  );
}

export default App;
