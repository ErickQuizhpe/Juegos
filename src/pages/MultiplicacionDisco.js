import React, { useState } from "react";
import "../styles/MultiplicacionDisco.css";

function MultiplicacionDisco() {
  const [numero1, setNumero1] = useState(1);
  const [numero2, setNumero2] = useState(1);
  const [resultado, setResultado] = useState(null);

  const handleCalcular = () => {
    setResultado(numero1 * numero2);
  };

  return (
    <div className="disco-container">
      {/* Selección de número 1 */}
      <div className="disco-item">
        <label htmlFor="numero1" className="font-bold text-2xl">
          Número 1:
        </label>
        <select className="text-3xl text-center text-red-900"
          id="numero1"
          value={numero1}
          onChange={(e) => setNumero1(Number(e.target.value))}
        >
          {[...Array(12).keys()].map((i) => (
            <option className="text-2xl" key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Selección de número 2 */}
      <div className="disco-item">
        <label htmlFor="numero2" className="font-bold text-2xl">
          Número 2:
        </label>
        <select className="text-3xl text-center text-blue-900 "
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
      <div className="disco-item ">
        <button
          onClick={handleCalcular}
          className="transition-colors duration-300 ease-in-out bg-green-500
           text-white hover:bg-blue-500 hover:text-gray-900 p-3 rounded-md
            txt-3xl font-bold">
          Calcular
        </button>
      </div>

      {/* Cuadro de resultado */}
      {resultado !== null && (
        <div className="disco-item">
          <h3 className="font-bold text-2xl text-black-900">Resultado: {resultado}</h3>
        </div>
      )}
    </div>
  );
}

export default MultiplicacionDisco;
