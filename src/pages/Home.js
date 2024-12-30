import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";
import unidades from "../assets/UNIDADES.png"
import operaciones from "../assets/Operaciones.jpg"


const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Seleccione una opción para empezar</h1>
      <div style={styles.optionsContainer}>
        <div
          style={styles.option}
          onClick={() => navigate("/games?type=operations")}
        >
          <img
            src={operaciones}
            alt="Operaciones"
            style={styles.icon}
          />
          <p>Operaciones con agrupaciones</p>
        </div>
        <div
          style={styles.option}
          onClick={() => navigate("/games?type=units")}
        >
          <img
            src={unidades}
            alt="Identificación de unidades"
            style={styles.icon}
          />
          <p>Identificación unidades y operaciones matemáticas</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#d0f0ff",
    height: "100vh",
    padding: "20px",
  },
  title: {
    fontSize: "24px",
    color: "#4a4a4a",
    marginBottom: "20px",
  },
  optionsContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
  },
  option: {
    width: "40%",
    textAlign: "center",
    backgroundColor: "#f6e5fc",
    padding: "20px",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  icon: {
    width: "400px",
    height: "150px",
    marginBottom: "10px",
  },
  exitButton: {
    marginTop: "20px",
    backgroundColor: "#ff6666",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
};

export default HomePage;