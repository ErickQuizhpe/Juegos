import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import GamesPage from "./pages/Gamepage";
import React from "react";
import IdentificacionUnidadesJuego from "./componets/IdentificacionUnidadesJuego";
import Multiplicaciones from "./pages/MultiplicationPage";
import OperacionesAgrupacion from "./pages/OperacionesAgrupacion";
import MinusPage from "./pages/MinusPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<HomePage />} />

        {/* Página de juegos */}
        <Route path="/games" element={<GamesPage />} />

        {/* Página para juegos específicos */}
        <Route
          path="/game/:operation"
          element={<IdentificacionUnidadesJuego />}
        />

        <Route path="/Multiplicaciones" element={<Multiplicaciones />} />

        <Route
          path="/OperacionesAgrupaciones"
          element={<OperacionesAgrupacion />}
        />
        <Route path="/MinusPage" element={<MinusPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
