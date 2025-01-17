import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";


const GamesPage = () => {
  const navigate = useNavigate();

  const goToGame = (operation) => {
    navigate(`/game/${operation}`);
  };
  const handleLogout = () => {
    // Redirigir a la página principal (o cualquier otra página de salida)
    navigate("/");
  };
  return (
    <div className="games-page">
      <h1>Selecciona un juego</h1>
      <div className="button-container">
        <button onClick={() => navigate("/Sumas")}>Suma</button>
        <button onClick={() => goToGame("subtraction")}>Resta</button>
        <button onClick={() => goToGame("multiplication")}>Multiplicación</button>
        <button onClick={() => goToGame("division")}>División</button>
        <button onClick={() => navigate("/Multiplicaciones")}>
          Multiplicaciones Prueba
        </button>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Salir
      </button>
    </div>
  );
};

export default GamesPage;
