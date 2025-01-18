import React, { useState } from "react";
import "../styles/DivisionTable.css"; 

function DivisionTable() {
  const [numero1, setNumero1] = useState(1);
  const [numero2, setNumero2] = useState(1);
  const [resultado, setResultado] = useState(null);

  const handleCalcular = () => {
    if (numero2 === 0) {
      setResultado("No se puede dividir entre 0");
    } else {
      const division = numero1 / numero2;
      setResultado(Number.isInteger(division) ? division : division.toFixed(2));
    }
  };

  return (
    <div className="division-disco-container">
      {/* Selección de número 1 */}
      <div className="division-disco-item">
        <label htmlFor="numero1" className="division-disco-label">
          Número 1:
        </label>
        <select
          className="division-disco-select numero1-select"
          id="numero1"
          value={numero1}
          onChange={(e) => setNumero1(Number(e.target.value))}
        >
          {[...Array(13).keys()].map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>

      {/* Selección de número 2 */}
      <div className="division-disco-item">
        <label htmlFor="numero2" className="division-disco-label">
          Número 2:
        </label>
        <select
          className="division-disco-select numero2-select"
          id="numero2"
          value={numero2}
          onChange={(e) => setNumero2(Number(e.target.value))}
        >
          {[...Array(13).keys()].map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>

      {/* Botón para calcular */}
      <div className="division-disco-item">
        <button
          onClick={handleCalcular}
          className="division-disco-button"
        >
          Dividir!
        </button>
      </div>

      {/* Cuadro de resultado */}
      {resultado !== null && (
        <div className="division-disco-item">
          <h3 className="division-disco-result">
            {typeof resultado === "string" ? resultado : `El resultado es: ${resultado}`}
          </h3>
        </div>
      )}
    </div>
  );
}

export default DivisionTable;
