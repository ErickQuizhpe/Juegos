import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../styles/GameComponent.css";
import "../styles/Prueba.css";

const GameComponent = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [exerciseCount, setExerciseCount] = useState(0);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  // Genera la tabla para ingresar la multiplicación
  const [num1, setNum1] = useState(["", "", "", "", "", "", "", "", "", ""]);
  const [num2, setNum2] = useState(["", "", "", "", "", "", "", "", "", ""]);
  const [userAnswer, setUserAnswer] = useState(Array(10).fill(""));
  const [carry, setCarry] = useState(Array(10).fill(""));
  const [partialResults, setPartialResults] = useState([]); // Nueva tabla para los resultados parciales
  const [operationStarted, setOperationStarted] = useState(false); // Estado para controlar si la operación ha comenzado

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
    // Filtra las cifras numéricas en num2, ignorando las que no son números
    const digitsInNum2 = num2.filter((digit) => /^\d$/.test(digit)).length; // Solo cuenta las cifras numéricas

    if (digitsInNum2 > 1) {
      const initialTable = Array(digitsInNum2)
        .fill(0)
        .map(() => Array(10).fill("")); // Tabla vacía con filas = cifras de num2, columnas = 10
      setPartialResults(initialTable);
    } else {
      setPartialResults([]); // No genera resultados parciales si num2 tiene solo una cifra válida
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
      .padStart(10, "") // Rellena con ceros hasta 10 dígitos
      .split("");
    const userResponse = userAnswer
      .join("") // Une la respuesta del usuario
      .padStart(10, "") // Rellena con ceros si es necesario
      .split(""); // Lo convierte en un array

    if (JSON.stringify(userResponse) === JSON.stringify(correctAnswerDigits)) {
      setFeedback("¡Correcto! 🎉");
      // Incrementa el contador de ejercicios
      setExerciseCount(exerciseCount + 1);

      if (exerciseCount >= 5) {
        setShowCompletionMessage(true);
      }
    } else {
      setFeedback(
        `Incorrecto. La respuesta correcta es ${correctAnswerDigits.join("")}.`
      );
    }
  };
  // Maneja la acción de ingresar operación
  const handleStartOperation = () => {
    setOperationStarted(true); // Marca la operación como iniciada
    generatePartialResultsTable(); // Generar la tabla de resultados parciales
  };

  // Maneja la acción de limpiar todo
  const handleClear = () => {
    setNum1(["", "", "", "", "", "", "", "", "", ""]);
    setNum2(["", "", "", "", "", "", "", "", "", ""]);
    setUserAnswer(Array(10).fill(""));
    setCarry(Array(10).fill(""));
    setPartialResults([]);
    setOperationStarted(false); // Restablece el estado de la operación
    setFeedback(""); // Limpiar mensaje de retroalimentación
  };

  return (
    <div className="game-component">
      {/* Tabla de entrada principal */}
      <div className="table-container">
        <table className="operation-table carry_row">
          <thead>
            <tr>
              <th> </th>
              <th>cm</th>
              <th>dM</th>
              <th>uM</th>
              <th>Cm</th>
              <th>Dm</th>
              <th>Um</th>
              <th> C</th>
              <th> D</th>
              <th> U</th>
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

      {/* Botón para ingresar operación */}
      {!operationStarted && (
        <button onClick={handleStartOperation}>Ingresar operación</button>
      )}

      {/* Tabla dinámica para resultados parciales */}
      {operationStarted && partialResults.length > 0 && (
        <div className="table-container">
          <table className="operation-table">
            <tbody>
              {partialResults.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {/* Generar celdas con base en las columnas disponibles */}
                  {row.slice(0, row.length - rowIndex).map((cell, colIndex) => (
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
      {operationStarted && (
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
                      onChange={(e) =>
                        handleUserAnswerChange(index, e.target.value)
                      }
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {feedback && <p>{feedback}</p>}
      {showCompletionMessage ? (
        <h2>¡Bien hecho! Has completado todos los ejercicios.</h2>
      ) : (
        <button onClick={handleCheckAnswer}>Comprobar Respuesta</button>
      )}
      <button onClick={handleClear}>Limpiar</button>
      <button onClick={() => navigate("/games")}>Regresar</button>
    </div>
  );
};

export default GameComponent;
