import React from "react";
import { useNavigate } from "react-router-dom";
import unidades from "../assets/UNIDADES.png";
import operaciones from "../assets/Image/operaciones.png";
import "../styles/Home.css";
import agrupacion from "../assets/Image/agrupacion.png";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <h1 className="home-title">¡Selecciona una Actividad!</h1>
      <div className="menu-container">
        {/* Opción 1: Operaciones Matemáticas */}
        <div
          className="menu-option"
          onClick={() => navigate("/games?type=operations")}
        >
          <img className="menu-icon" src={operaciones} alt="Operaciones" />
          <p className="menu-text">Operaciones Matemáticas</p>
        </div>
        {/* Opción 2: Identificación de Unidades */}
        <div
          className="menu-option"
          onClick={() => navigate("/OperacionesAgrupaciones")}
        >
          <img className="menu-icon" src={agrupacion} alt="Unidades" />
          <p className="menu-text">Operaciones con Agrupación</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;


// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     backgroundColor: "#d0f0ff",
//     height: "100vh",
//     width: "100%",
//     padding: "20px",
//   },
//   title: {
//     fontSize: "40px",
//     color: "#4a4a4a",
//     marginBottom: "20px",
//     letterSpacing: "2px",
//     textShadow:
//       "2px 2px 5px rgba(0, 0, 0, 0.7), 0 0 25px rgba(255, 255, 255, 0.6)",
//   },
//   optionsContainer: {
//     display: "flex",
//     justifyContent: "space-around",
//     width: "100%",
//   },
//   option: {
//     width: "40%",
//     textAlign: "center",
//     backgroundColor: "#f6e5fc",
//     padding: "20px",
//     borderRadius: "10px",
//     cursor: "pointer",
//     boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//   },
//   icon: {
//     width: "400px",
//     height: "150px",
//     marginBottom: "10px",
//   },
//   exitButton: {
//     marginTop: "20px",
//     backgroundColor: "#ff6666",
//     color: "#fff",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     border: "none",
//     cursor: "pointer",
//   },
// };


