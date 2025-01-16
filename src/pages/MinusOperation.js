import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MultiplicationOperation.css"; // Si usas CSS para estilo, no lo toques

const SubtractionOperation = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [exerciseCount, setExerciseCount] = useState(0);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  // Genera la tabla para ingresar la resta
  const [num1, setNum1] = useState(["", "", "", "", "", "", "", ""]);
  const [num2, setNum2] = useState(["-", "", "", "", "", "", "", ""]);
  const [userAnswer, setUserAnswer] = useState(Array(8).fill(""));
  const [carry, setCarry] = useState(Array(8).fill(""));
  const [operationStarted, setOperationStarted] = useState(false);

  // Calcula la respuesta correcta (resta)
  const calculateCorrectAnswer = () => {
    const num1Value = parseInt(num1.filter((digit) => /^\d$/.test(digit)).join(""), 10) || 0;
    const num2Value = parseInt(num2.filter((digit) => /^\d$/.test(digit)).join(""), 10) || 0;
    return num1Value - num2Value; // Realiza la resta correctamente
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

  const generatePartialResultsTable = () => {
    setCarry(Array(8).fill("")); // Resetea la tabla de acarreo
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
        "Por favor, ingresa los números que deseas restar antes de comprobar la respuesta."
      );
      return; // Detiene la ejecución si no se ingresaron valores válidos
    }

    // Verificación de la respuesta correcta
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
      generatePartialResultsTable(); // Generar tabla de acarreo
      setOperationStarted(true);
    } else {
      setFeedback("Por favor, ingresa los números que deseas restar.");
    }
  };

  // Maneja la acción de limpiar todo
  const handleClear = () => {
    setNum1(["", "", "", "", "", "", "", ""]); // Restablece el primer número
    setNum2(["-", "", "", "", "", "", "", ""]); // Restablece el segundo número
    setUserAnswer(Array(8).fill("")); // Restablece la respuesta
    setCarry(Array(8).fill("")); // Restablece la fila de acarreo
    setOperationStarted(false); // Restablece estado de operación
    setFeedback(""); // Limpiar mensaje
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

      {/* Mostrar tabla de resultados solo cuando la operación ha comenzado */}
      {operationStarted && (
        <>
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
        </>
      )}

      {/* Botones */}
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
        <button onClick={() => navigate("/games")}>Regresar</button>
      </div>
    </div>
  );
};

export default SubtractionOperation;
