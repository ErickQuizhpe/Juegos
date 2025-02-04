import React, { useState } from "react";
import "../styles/AdditionTable.css";

function PlusTable() {
  const [numero1, setNumero1] = useState(1);
  const [numero2, setNumero2] = useState(1);
  const [resultado, setResultado] = useState(null);

  const handleCalcular = () => {
    setResultado(numero1 + numero2);
  };

  // Generar la tabla de suma para el número 1

  return (
    <div className="suma-disco-container">
      {/* Selección de número 1 */}
      <div className="suma-disco-item">
        <label htmlFor="numero1" className="suma-disco-label">
          Número 1:
        </label>
        <select
          className="suma-disco-select numero1-select"
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
      <div className="suma-disco-item">
        <label htmlFor="numero2" className="suma-disco-label">
          Número 2:
        </label>
        <select
          className="suma-disco-select numero2-select"
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
      <div className="suma-disco-item">
        <button
          onClick={handleCalcular}
          className="suma-disco-button"
        >
          ¡Sumar!
        </button>
      </div>

      {/* Cuadro de resultado */}
      {resultado !== null && (
        <div className="suma-disco-item">
          <h3 className="suma-disco-result">
            El resultado es: {resultado}
          </h3>
        </div>
      )}

  
    </div>
  );
}

export default PlusTable;
