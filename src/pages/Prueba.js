import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../styles/GameComponent.css";
import "../styles/Prueba.css";

const GameComponent = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [exerciseCount, setExerciseCount] = useState(0);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  const [num1, setNum1] = useState(["", "", "", "", "", ""]);
  const [num2, setNum2] = useState(["", "", "", "", "", ""]);
  const [userAnswer, setUserAnswer] = useState(Array(7).fill(""));
  const [carry, setCarry] = useState(Array(6).fill(""));
  const [partialResults, setPartialResults] = useState([]); // Nueva tabla para los resultados parciales

  // Calcula la respuesta correcta (multiplicación)
  const calculateCorrectAnswer = () => {
    const num1Value = parseInt(num1.join(""), 10) || 0;
    const num2Value = parseInt(num2.join(""), 10) || 0;
    return num1Value * num2Value;
  };

  // Maneja el cambio en los valores de los dígitos llevados
  const handleCarryChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const updatedCarry = [...carry];
      updatedCarry[index] = value;
      setCarry(updatedCarry);
    }
  };

  // Maneja el cambio en los valores de los dígitos de entrada
  const handleNumberChange = (index, value, numType) => {
    if (/^\d?$/.test(value)) {
      const updatedNum = numType === "num1" ? [...num1] : [...num2];
      updatedNum[index] = value;
      numType === "num1" ? setNum1(updatedNum) : setNum2(updatedNum);
    }
  };

  // Genera la tabla dinámica basada en el tamaño de num2
  const generatePartialResultsTable = () => {
    const digitsInNum2 = num2.filter((digit) => digit !== "").length; // Número de cifras no vacías en num2
    if (digitsInNum2 > 1) {
      const initialTable = Array(digitsInNum2)
        .fill(0)
        .map(() => Array(7).fill("")); // Tabla vacía con filas = cifras de num2, columnas = 7
      setPartialResults(initialTable);
    } else {
      setPartialResults([]); // No genera resultados parciales si num2 tiene solo una cifra
    }
  };

  // Maneja el cambio en los valores de la tabla de resultados parciales
  const handlePartialResultChange = (rowIndex, colIndex, value) => {
    if (/^\d?$/.test(value)) {
      const updatedResults = [...partialResults];
      updatedResults[rowIndex][colIndex] = value;
      setPartialResults(updatedResults);
    }
  };

  // Maneja el cambio en los valores de la respuesta del usuario
  const handleUserAnswerChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const updatedAnswer = [...userAnswer];
      updatedAnswer[index] = value;
      setUserAnswer(updatedAnswer);
    }
  };

  // Maneja la verificación de la respuesta ingresada por el usuario
  const handleCheckAnswer = () => {
    const correctAnswer = calculateCorrectAnswer();
    const correctAnswerDigits = correctAnswer
      .toString()
      .padStart(7, "0")
      .split(""); // Respuesta correcta como array de dígitos
    const userResponse = userAnswer.map((digit) => digit || "0"); // Asegúrate de que los campos vacíos se consideren como "0"

    if (JSON.stringify(userResponse) === JSON.stringify(correctAnswerDigits)) {
      setFeedback("¡Correcto! 🎉");
    } else {
      setFeedback(
        `Incorrecto. La respuesta correcta es ${correctAnswerDigits.join("")}.`
      );
    }

    // Incrementa el contador de ejercicios
    setExerciseCount(exerciseCount + 1);

    if (exerciseCount >= 5) {
      setShowCompletionMessage(true);
    } else {
      setUserAnswer(Array(7).fill(""));
      setCarry(Array(6).fill(""));
      generatePartialResultsTable(); // Generar nueva tabla dinámica
    }
  };

  return (
    <div className="game-component">
      <h1>Juego de Multiplicación</h1>

      {/* Tabla de entrada principal */}
      <div className="table-container">
        <table className="operation-table">
          <thead>
            <tr>
              <th>MM</th>
              <th>CM</th>
              <th>DM</th>
              <th>UM</th>
              <th>C</th>
              <th>D</th>
              <th>U</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {carry.map((digit, index) => (
                <td key={index}>
                  <input
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleCarryChange(index, e.target.value)}
                  />
                </td>
              ))}
            </tr>
            <tr>
              {num1.map((digit, index) => (
                <td key={index}>
                  <input
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) =>
                      handleNumberChange(index, e.target.value, "num1")
                    }
                  />
                </td>
              ))}
            </tr>
            <tr>
              {num2.map((digit, index) => (
                <td key={index}>
                  <input
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) =>
                      handleNumberChange(index, e.target.value, "num2")
                    }
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tabla dinámica para resultados parciales */}
      {partialResults.length > 0 && (
        <div className="table-container">
          <table className="operation-table">
            <tbody>
              {partialResults.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex}>
                      <input
                        type="text"
                        maxLength="1"
                        value={cell}
                        onChange={(e) =>
                          handlePartialResultChange(
                            rowIndex,
                            colIndex,
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
        </div>
      )}

      {/* Tabla para la respuesta del usuario */}
      <div className="table-container">
        <table className="operation-table">
          <tbody>
            <tr>
              {userAnswer.map((digit, index) => (
                <td key={index}>
                  <input
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleUserAnswerChange(index, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>


      {feedback && <p>{feedback}</p>}
      {showCompletionMessage ? (
        <h2>¡Bien hecho! Has completado todos los ejercicios.</h2>
      ) : (
        <button onClick={handleCheckAnswer}>Comprobar</button>
      )}
      <button onClick={() => navigate("/games")}>Regresar</button>
    </div>
  );
};

export default GameComponent;
