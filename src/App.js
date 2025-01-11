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
        {/* Página principal */}
        <Route path="/" element={<HomePage />} />
        
        {/* Página de juegos */}
        <Route path="/games" element={<GamesPage />} />
        
        {/* Página para juegos específicos */}
        <Route path="/game/:operation" element={<IdentificacionUnidadesJuego />} />
        
        {/* Ruta para la página HTML de multiplicaciones-unidades */}
        <Route
          path="/multiplicaciones-unidades"
          element={
            <iframe
              src="./pages/MultiplicacionesUnidades.html"
              style={{
                width: '100%',
                height: '100vh',
                border: 'none',
              }}
              title="Multiplicaciones Unidades"
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

