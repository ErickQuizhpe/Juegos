import React, { useState } from "react";
import "../styles/MinusTable.css";

function SubtractionTable() {
  const [numero1, setNumero1] = useState(1);
  const [numero2, setNumero2] = useState(1);
  const [resultado, setResultado] = useState(null);

  const handleCalcular = () => {
    setResultado(numero1 - numero2);
  };

  return (
    <div className="resta-disco-container">
      {/* Selección de número 1 */}
      <div className="resta-disco-item">
        <label htmlFor="numero1" className="resta-disco-label">
          Número 1:
        </label>
        <select
          className="resta-disco-select numero1-select"
          id="numero1"
          value={numero1}
          onChange={(e) => setNumero1(Number(e.target.value))}
        >
          {[...Array(12).keys()].map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>

      {/* Selección de número 2 */}
      <div className="resta-disco-item">
        <label htmlFor="numero2" className="resta-disco-label">
          Número 2:
        </label>
        <select
          className="resta-disco-select numero2-select"
          id="numero2"
          value={numero2}
          onChange={(e) => setNumero2(Number(e.target.value))}
        >
          {[...Array(12).keys()].map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>

      {/* Botón para calcular */}
      <div className="resta-disco-item">
        <button
          onClick={handleCalcular}
          className="resta-disco-button"
        >
          ¡Restar!
        </button>
      </div>

      {/* Cuadro de resultado */}
      {resultado !== null && (
        <div className="resta-disco-item">
          <h3 className="resta-disco-result">
            El resultado es: {resultado}
          </h3>
        </div>
      )}
    </div>
  );
}

export default SubtractionTable;
