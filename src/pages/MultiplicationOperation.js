import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MultiplicationOperation.css";

/**
 * GameComponent is a React functional component for a multiplication game.
 * It manages user input for two numbers, calculates the correct multiplication result,
 * and validates the user's answer. The component provides feedback on correctness,
 * supports multiple exercises, and includes UI elements for user interaction.
 * 
 * State Variables:
 * - feedback: Stores feedback messages for the user.
 * - exerciseCount: Tracks the number of exercises completed.
 * - showCompletionMessage: Indicates whether to show the completion message.
 * - num1: Represents the first number as an array of digits.
 * - num2: Represents the second number as an array of digits.
 * - userAnswer: Stores the user's answer as an array of digits.
 * - carry: Manages carry digits for calculations.
 * - partialResults: Stores partial results for display.
 * - operationStarted: Flags whether the operation has begun.
 * 
 * Functions:
 * - calculateCorrectAnswer: Computes the correct result of the multiplication.
 * - handleCarryChange: Updates the carry digits based on user input.
 * - handleNumberChange: Updates the digits of num1 or num2 based on user input.
 * - handleClearCarry: Clears the carry digits.
 * - generatePartialResultsTable: Creates a table for partial multiplication results.
 * - handlePartialResultChange: Updates partial results based on user input.
 * - handleUserAnswerChange: Updates the user's answer based on input.
 * - handleCheckAnswer: Validates the user's answer against the correct one.
 * - handleStartOperation: Initiates the operation and generates partial results.
 * - handleClear: Resets the game state for a new operation.
 */

const MultiplicationOperation = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [exerciseCount, setExerciseCount] = useState(0);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  // Genera la tabla para ingresar la multiplicación
  const [num1, setNum1] = useState(["", "", "", "", "", "", "", ""]);
  const [num2, setNum2] = useState(["X", "", "", "", "", "", "", ""]);
  const [userAnswer, setUserAnswer] = useState(Array(8).fill(""));
  const [carry, setCarry] = useState(Array(8).fill(""));
  const [partialResults, setPartialResults] = useState([]); // Nueva tabla para los resultados parciales
  const [operationStarted, setOperationStarted] = useState(false); // Estado para controlar si la operación ha comenzado

  // Calcula la respuesta correcta (multiplicación)
  const calculateCorrectAnswer = () => {
    const num1Value = parseInt(num1.join(""), 10) || 0;
    const num2Value =
      parseInt(num2.filter((digit) => /^\d$/.test(digit)).join(""), 10) || 0; // Filtrar solo dígitos válidos
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

  // Función para limpiar la fila de acarreo
  const handleClearCarry = () => {
    setCarry(Array(8).fill("")); // Restablece la fila de acarreo a valores vacíos
  };

  // Genera la tabla de resultados parciales
  const generatePartialResultsTable = () => {
    const digitsInNum2 = num2.filter((digit) => /^\d$/.test(digit)).length;

    if (digitsInNum2 > 1) {
      const initialTable = Array(digitsInNum2)
        .fill(0)
        .map(() => Array(8).fill("")); // Tabla vacía con filas = cifras de num2, columnas = 10
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
    const isNum1Valid = num1.some((digit) => /^\d$/.test(digit));
    const isNum2Valid = num2.some((digit) => /^\d$/.test(digit));
    const isUserAnswerValid = userAnswer.some((digit) => /^\d$/.test(digit));

    if (!isNum1Valid || !isNum2Valid || !isUserAnswerValid) {
      setFeedback(
        "Por favor, ingresa los números que deseas multiplicar antes de comprobar la respuesta."
      );
      return; // Detiene la ejecución si no se ingresaron valores válidos
    }

    const correctAnswer = calculateCorrectAnswer();
    const correctAnswerDigits = correctAnswer
      .toString()
      .padStart(7, "") // Espacios en blanco para legibilidad de la respuesta
      .split("");
    const userResponse = userAnswer
      .join("") // Une la respuesta del usuario
      .padStart(7, "") // Espacios en blanco para legibilidad
      .split(""); // Lo convierte en un array

    if (JSON.stringify(userResponse) === JSON.stringify(correctAnswerDigits)) {
      setFeedback("¡Correcto! 🎉");
      setExerciseCount(exerciseCount + 1);

      if (exerciseCount >= 100) {
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
    const isNum1Valid = num1.some((digit) => /^\d$/.test(digit));
    const isNum2Valid = num2.some((digit) => /^\d$/.test(digit));

    if (isNum1Valid && isNum2Valid) {
      generatePartialResultsTable();
      setOperationStarted(true);
    } else {
      setFeedback("Por favor, ingresa los números que deseas multiplicar.");
    }
  };

  // Maneja la acción de limpiar todo
  const handleClear = () => {
    setNum1(["", "", "", "", "", "", "", ""]);
    setNum2(["X", "", "", "", "", "", "", ""]);
    setUserAnswer(Array(8).fill(""));
    setCarry(Array(8).fill(""));
    setPartialResults([]);
    setOperationStarted(false);
    setFeedback("");
  };

  return (
    <div className="game-component">
      {/* Tabla de entrada principal */}
      <div className="table-container">
        <table className="operation-table carry_row">
          <thead>
            <tr>
              <th></th>
              <th></th>
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

      {/* Mostrar las líneas solo cuando la operación ha comenzado */}
      {operationStarted && (
        <>
          {/* Mostrar línea sobre el resultado final si num2 tiene solo una cifra */}
          {num2.filter((digit) => /^\d$/.test(digit)).length > 1 && (
            <tr>
              <td colSpan="7" className="result-line">
              ------------------------------------------------------------------------
              </td>
            </tr>
          )}

          {/* Mostrar tabla de resultados parciales solo si hay más de una cifra en num2 */}
          {partialResults.length > 0 && (
            <div className="table-container">
              <table className="operation-table">
                <tbody>
                  {partialResults.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row
                        .slice(0, row.length - rowIndex)
                        .map((cell, colIndex) => (
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

          {/* Línea encima de la tabla de resultados finales */}
          <tr>
            <td colSpan="7" className="result-line">
            ------------------------------------------------------------------------
            </td>
          </tr>

          {/* Tabla para la respuesta del usuario */}
          <div className="table-container">
            <table className="operation-table result-table">
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
        </>
      )}

      <div className="button-group">
        {!operationStarted && (
          <button onClick={handleStartOperation}>Ingresar operación</button>
        )}
        {feedback && <p>{feedback}</p>}
        {showCompletionMessage ? (
          <h2>¡Bien hecho! Has completado todos los ejercicios.</h2>
        ) : (
          <button onClick={handleCheckAnswer}>Comprobar Respuesta</button>
        )}

        <button onClick={handleClear}>Nueva Operación</button>
        <button onClick={handleClearCarry}>Limpiar Acarreo</button>

        <button onClick={() => navigate("/games")}>Regresar</button>
      </div>
    </div>
  );
};

export default MultiplicationOperation;
