import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DivisionOperation.css";

const DivisionOperation = () => {
  const navigate = useNavigate();
  const [dividend, setDividend] = useState(Array(6).fill("")); // Tabla del dividendo
  const [divisor, setDivisor] = useState(Array(4).fill("")); // Tabla del divisor
  const [quotient, setQuotient] = useState(Array(4).fill("")); // Tabla del cociente
  const [partialResults, setPartialResults] = useState(Array(6).fill("")); // Tabla de resultados parciales
  const [feedback, setFeedback] = useState("");

  // Función para manejar cambios en el dividendo
  const handleDividendChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const updatedDividend = [...dividend];
      updatedDividend[index] = value;
      setDividend(updatedDividend);
    }
  };

  // Función para manejar cambios en el divisor
  const handleDivisorChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const updatedDivisor = [...divisor];
      updatedDivisor[index] = value;
      setDivisor(updatedDivisor);
    }
  };

  // Función para manejar cambios en el cociente no funciona
  const handleQuotientChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const updatedQuotient = [...quotient];
      updatedQuotient[index] = value;
      setQuotient(updatedQuotient);
    }
  };

  // Función para manejar los resultados parciales
  const handlePartialResultsChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const updatedResults = [...partialResults];
      updatedResults[index] = value;
      setPartialResults(updatedResults);
    }
  };

  // Función para comprobar la respuesta
  const comprobarRespuesta = () => {
    const dividendValue = parseInt(dividend.join(""), 10); // Convertir el dividendo en número
    const divisorValue = parseInt(divisor.join(""), 10); // Convertir el divisor en número
  
    if (isNaN(dividendValue) || isNaN(divisorValue)) {
      setFeedback("Por favor, ingresa valores válidos.");
      return;
    }
  
    const cocienteReal = Math.floor(dividendValue / divisorValue);
    const cocienteIngresado = parseInt(quotient.join(""), 10);
  
    // Lógica para validar el resto
    const restoCalculado = dividendValue % divisorValue;
    let restoIngresado = null;
  
    // Buscar la última fila con datos en la tabla de resultados parciales
    for (let i = partialResults.length - 1; i >= 0; i--) {
      if (partialResults[i] !== "") {
        restoIngresado = parseInt(partialResults[i], 10);
        break;
      }
    }
  
    // Validar el resto
    let restoFeedback = "";
    if (restoIngresado === null || isNaN(restoIngresado)) {
      restoFeedback = "Por favor, ingresa el resto.";
    } else if (restoIngresado === restoCalculado) {
      restoFeedback = "¡Resto correcto! 🎉";
    } else {
      restoFeedback = `Respuesta incorrecta. El resto correcto es ${restoCalculado}.`;
    }
  
    // Validar el cociente
    let cocienteFeedback = "";
    if (cocienteIngresado === cocienteReal) {
      cocienteFeedback = "¡Cociente correcto! 🎉";
    } else {
      cocienteFeedback = `Respuesta incorrecta. El cociente correcto es ${cocienteReal}.`;
    }
  
    setFeedback(`${cocienteFeedback} ${restoFeedback}`);
  };
  

  // Función para limpiar todos los datos
  const limpiarCeldas = () => {
    setDividend(Array(6).fill(""));
    setDivisor(Array(4).fill(""));
    setQuotient(Array(4).fill(""));
    setPartialResults(Array(6).fill(""));
    setFeedback("");
  };

  return (
    <div className="division-component">
      <h2 className="text-2xl font-bold mb-4">
        Resuelve la siguiente división:
      </h2>

      <div className="tables-container">
        <div className="table-container">
          <div className="vertical-label dividendo-label">Dividendo</div>
          <table className="operation-table dividendo">
            <tbody>
              <tr>
                {dividend.map((digit, index) => (
                  <td key={index}>
                    <input
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) =>
                        handleDividendChange(index, e.target.value)
                      }
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="table-container">
          <div className="vertical-label divisor-label">Divisor</div>
          <table className="operation-table divisor">
            <tbody>
              <tr>
                {divisor.map((digit, index) => (
                  <td key={index}>
                    <input
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) =>
                        handleDivisorChange(index, e.target.value)
                      }
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="table-container">
          <table className="operation-table resultados-parciales">
            <tbody>
              {[...Array(6)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {[...Array(6)].map((_, colIndex) => (
                    <td key={colIndex}>
                      <input
                        type="text"
                        maxLength="1"
                        value={partialResults[rowIndex * 6 + colIndex] || ""}
                        onChange={(e) =>
                          handlePartialResultsChange(
                            rowIndex * 6 + colIndex,
                            e.target.value
                          )
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="resto-label">Resto</div>
        </div>

        <div className="table-container">
          <table className="operation-table cociente">
            <tbody>
              <tr>
                {quotient.map((digit, index) => (
                  <td key={index}>
                    <input
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) =>
                        handleQuotientChange(index, e.target.value)
                      }
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <div className="resto-label text-xl font-bold text-fuchsia-800">
            Cociente
          </div>
        </div>
      </div>

      <div className="button-group">
        <button onClick={comprobarRespuesta}>Comprobar Respuesta</button>
        <button onClick={limpiarCeldas}>Nueva Operación</button>
        <button onClick={() => navigate("/")}>Volver</button>
      </div>

      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default DivisionOperation;
