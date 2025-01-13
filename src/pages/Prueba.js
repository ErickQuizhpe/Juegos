import React, { useState } from "react";
import "../styles/GameComponent.css";
import Big from "big.js";

const MultiplicacionComponent = () => {
  const [num1, setNum1] = useState(""); // Número 1 ingresado por el usuario
  const [num2, setNum2] = useState(""); // Número 2 ingresado por el usuario
  const [userAnswer, setUserAnswer] = useState([]); // Respuesta del usuario por dígito
  const [feedback, setFeedback] = useState(""); // Retroalimentación
  const [correctAnswer, setCorrectAnswer] = useState([]); // Respuesta correcta dividida en dígitos

  const handleInputChange = (e, setFunction) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setFunction(value);
    }
  };


  const handleGenerateAnswer = () => {
    if (!num1 || !num2) {
      setFeedback("Por favor, ingresa ambos números para realizar la operación.");
      return;
    }
  
    const product = Big(num1).times(Big(num2)).toString(); // Usa Big.js para multiplicar
    setCorrectAnswer(product.split("")); // Divide la respuesta en dígitos
    setUserAnswer(Array(product.length).fill("")); // Inicializa las casillas vacías
    setFeedback(""); // Limpia cualquier mensaje anterior
  };

  const handleAnswerChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const updatedAnswer = [...userAnswer];
      updatedAnswer[index] = value;
      setUserAnswer(updatedAnswer);
    }
  };

  const handleCheckAnswer = () => {
    if (JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)) {
      setFeedback("¡Correcto! 🎉");
    } else {
      setFeedback(
        `Incorrecto. La respuesta correcta es ${correctAnswer.join("")}.`
      );
    }
  };

  return (
    <div className="game-component">
      <h1 className="text-2xl font-bold mb-4">Multiplicación de Números</h1>
      
      {/* Entrada de números */}
      <div className="inputs-container mb-4">
        <div>
          <label htmlFor="num1">Número 1:</label>
          <input
            id="num1"
            type="text"
            value={num1}
            onChange={(e) => handleInputChange(e, setNum1)}
            className="number-input"
          />
        </div>
        <div>
          <label htmlFor="num2">Número 2:</label>
          <input
            id="num2"
            type="text"
            value={num2}
            onChange={(e) => handleInputChange(e, setNum2)}
            className="number-input"
          />
        </div>
        <button onClick={handleGenerateAnswer} className="generate-button">
          Generar
        </button>
      </div>

      {/* Tabla para respuesta */}
      {correctAnswer.length > 0 && (
        <div className="table-container">
          <h2 className="text-lg font-semibold mb-2">Tabla de Respuesta</h2>
          <table className="answer-table">
            <tbody>
              <tr>
                {correctAnswer.map((_, index) => (
                  <td key={`answer-cell-${index}`}>
                    <input
                      type="text"
                      maxLength="1"
                      value={userAnswer[index]}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      className="answer-input"
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Retroalimentación y botón de comprobación */}
      <div className="feedback-container mt-4">
        {feedback && <p className="feedback">{feedback}</p>}
        {correctAnswer.length > 0 && (
          <button onClick={handleCheckAnswer} className="check-button">
            Comprobar
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiplicacionComponent;
