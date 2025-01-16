import React, { useState } from "react";
import "../styles/MultiplicationTable.css";

function MultiplicationTable() {
  const [numero1, setNumero1] = useState(1);
  const [numero2, setNumero2] = useState(1);
  const [resultado, setResultado] = useState(null);

  const handleCalcular = () => {
    setResultado(numero1 * numero2);
  };

  return (
    <div className="multiplicacion-disco-container">
      {/* Selección de número 1 */}
      <div className="multiplicacion-disco-item">
        <label htmlFor="numero1" className="multiplicacion-disco-label">
          Número 1:
        </label>
        <select
          className="multiplicacion-disco-select numero1-select"
          id="numero1"
          value={numero1}
          onChange={(e) => setNumero1(Number(e.target.value))}
        >
          {[...Array(12).keys()].map((i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Selección de número 2 */}
      <div className="multiplicacion-disco-item">
        <label htmlFor="numero2" className="multiplicacion-disco-label">
          Número 2:
        </label>
        <select
          className="multiplicacion-disco-select numero2-select"
          id="numero2"
          value={numero2}
          onChange={(e) => setNumero2(Number(e.target.value))}
        >
          {[...Array(12).keys()].map((i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Botón para calcular */}
      <div className="multiplicacion-disco-item">
        <button
          onClick={handleCalcular}
          className="multiplicacion-disco-button"
        >
          ¡Calcular!
        </button>
      </div>

      {/* Cuadro de resultado */}
      {resultado !== null && (
        <div className="multiplicacion-disco-item">
          <h3 className="multiplicacion-disco-result">
            El resultado es: {resultado}
          </h3>
        </div>
      )}
    </div>
  );
}

export default MultiplicationTable;
