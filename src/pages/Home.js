import React from "react";
import { useNavigate } from "react-router-dom";
import { Particles } from "@tsparticles/react";
import operaciones from "../assets/Image/matematicas.png";
import "../styles/Home.css";
import agrupacion from "../assets/Image/agrupacion.png";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Fondo animado con partículas */}
      <Particles
        options={{
          particles: {
            number: {
              value: 50, // Número de partículas
              density: {
                enable: true,
                value_area: 800, // Área donde las partículas se dispersan
              },
            },
            size: {
              value: 3, // Tamaño de las partículas
            },
            move: {
              enable: true,
              speed: 3, // Velocidad de las partículas
              direction: "none", // Dirección aleatoria
              random: true, // Hace que las partículas se muevan de manera más aleatoria
            },
            links: {
              enable: false, // Desactiva las conexiones entre partículas
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "repulse", // Las partículas se repelen cuando se pasa el mouse sobre ellas
              },
            },
          },
        }}
      />

      <h1 className="home-title">¡Selecciona una Actividad!</h1>
      <div className="menu-container">
        {/* Opción 1: Operaciones Matemáticas */}
        <div
          className="menu-option"
          onClick={() => navigate("/games")}
        >
          <img className="menu-icon" src={operaciones} alt="Operaciones" />
          <p className="menu-text">Operaciones Matemáticas</p>
        </div>
        {/* Opción 2: Identificación de Unidades */}
        <div
          className="menu-option"
          onClick={() => navigate("/OperacionesAgrupacion")}
        >
          <img className="menu-icon" src={agrupacion} alt="Unidades" />
          <p className="menu-text">Operaciones con Agrupación</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
