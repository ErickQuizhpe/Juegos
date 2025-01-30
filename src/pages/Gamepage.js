import React from "react";
import { useNavigate } from "react-router-dom";
// import "../styles/GameComponent.css";
import "../styles/GamePage.css";

const GamesPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Redirigir a la página principal (o cualquier otra página de salida)
    navigate("/");
  };
  return (
    <div className="games-page">
      <h1>Que operación deseas practicar?</h1>
      <div className="button-container">
        <button onClick={() => navigate("/AdditionPage")}>Suma</button>
        <button onClick={() => navigate("/MinusPage")}>Resta</button>
        <button onClick={() => navigate("/DivisionPage")}>División</button>
        <button onClick={() => navigate("/Multiplicaciones")}> Multiplicación</button>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Salir
      </button>
    </div>
  );
};

export default GamesPage;
