import React, { useState } from "react";
import "../styles/DivisionGame.css";

const DivisionGame = () => {
  const [dividendo, setDividendo] = useState("");
  const [divisor, setDivisor] = useState("");
  const [steps, setSteps] = useState([]);
  const [cociente, setCociente] = useState(""); // Respuesta del cociente
  const [feedback, setFeedback] = useState(""); // Retroalimentación
  const [divisorDigits, setDivisorDigits] = useState([]); // Dígitos descompuestos del divisor

  const handleDividendoChange = (e) => setDividendo(e.target.value);
  const handleDivisorChange = (e) => {
    const value = e.target.value;
    setDivisor(value);
    setDivisorDigits(value.split("").map(Number)); // Divide el divisor en sus dígitos
  };

  const startDivision = () => {
    if (!dividendo || !divisor) {
      alert("Por favor, ingresa el dividendo y el divisor.");
      return;
    }
    const parsedDividendo = dividendo.toString().split("").map(Number);
    setSteps(parsedDividendo);
    setCociente(""); // Limpiar cociente cuando se empieza
    setFeedback("");
  };

  const checkAnswer = () => {
    const correctResult = Math.floor(dividendo / divisor);
    if (parseInt(cociente) === correctResult) {
      setFeedback("¡Correcto! 🎉");
    } else {
      setFeedback(`Incorrecto. La respuesta correcta es ${correctResult}.`);
    }
  };

  const generateCocienteInputs = () => {
    const cocienteLength = Math.floor(dividendo / divisor).toString().length;

    const inputs = [];
    for (let i = 0; i < cocienteLength; i++) {
      inputs.push(
        <input
          key={i}
          type="number"
          maxLength="1"
          value={cociente[i] || ""}
          onChange={(e) => {
            const newCociente = [...cociente];
            newCociente[i] = e.target.value;
            setCociente(newCociente.join(''));
          }}
          className="cociente-input"
          style={{ width: "30px", textAlign: "center" }}
        />
      );
    }
    return inputs;
  };

  return (
    <div className="division-container">
      <h1>Juego de División</h1>

      {/* Sección de entrada */}
      <div className="input-section">
        <h2>Ingrese los números</h2>
        <div>
          <label>Dividendo:</label>
          <input
            type="number"
            value={dividendo}
            onChange={handleDividendoChange}
          />
        </div>
        <div>
          <label>Divisor:</label>
          <input
            type="number"
            value={divisor}
            onChange={handleDivisorChange}
          />
        </div>
        <button onClick={startDivision}>Iniciar División</button>
      </div>

      {/* Sección del proceso de la división */}
      <div className="game-section">
        <div className="left-panel">
          <h3>Dividendo desglosado</h3>
          <div className="grid">
            {steps.map((digit, index) => (
              <div
                className={`grid-cell ${index === 0 ? "current-cell" : ""}`}
                key={index}
              >
                {digit}
              </div>
            ))}
          </div>
        </div>

        <div className="line-divider"></div>

        <div className="right-panel">
          <h3>Divisor desglosado</h3>
          <div className="grid">
            {divisorDigits.map((digit, index) => (
              <div className="grid-cell" key={index}>
                {digit}
              </div>
            ))}
          </div>

          {/* Entrada para cociente */}
          <div>
            <label>Respuesta (Cociente):</label>
            <div className="cociente-container">
              {generateCocienteInputs()}
            </div>
          </div>

          <div>
            <button onClick={checkAnswer}>Comprobar Respuesta</button>
          </div>
          {feedback && <p>{feedback}</p>}
        </div>
      </div>

      {/* Botones de control */}
      <div className="control-buttons">
        <button onClick={() => window.location.reload()}>Reiniciar</button>
      </div>
    </div>
  );
};

export default DivisionGame;
