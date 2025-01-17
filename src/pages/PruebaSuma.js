import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PruebaSuma.css";

const GameComponent = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [exerciseCount, setExerciseCount] = useState(0);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  // Estados para los números y la respuesta del usuario
  const [num1, setNum1] = useState(["", "", "", "", "", "", "", ""]);
  const [num2, setNum2] = useState(["+", "", "", "", "", "", "", ""]);
  const [userAnswer, setUserAnswer] = useState(Array(8).fill(""));
  const [carry, setCarry] = useState(Array(8).fill("")); // Acarreo
  const [operationStarted, setOperationStarted] = useState(false);

  // Calcula la respuesta correcta (suma)
  const calculateCorrectAnswer = () => {
    const num1Value = parseInt(num1.join(""), 10) || 0;
    const num2Value =
      parseInt(num2.filter((digit) => /^\d$/.test(digit)).join(""), 10) || 0; // Filtra solo dígitos válidos
    return num1Value + num2Value;
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

  // Limpia la fila de acarreo
  const handleClearCarry = () => {
    setCarry(Array(8).fill(""));
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
      .padStart(7, "")
      .split("");
    const userResponse = userAnswer.join("").padStart(7, "").split("");

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

  // Inicia la operación
  const handleStartOperation = () => {
    const isNum1Valid = num1.some((digit) => /^\d$/.test(digit));
    const isNum2Valid = num2.some((digit) => /^\d$/.test(digit));

    if (isNum1Valid && isNum2Valid) {
      setOperationStarted(true);
    } else {
      setFeedback("Por favor, ingresa los números que deseas sumar.");
    }
  };

  // Limpia todos los datos
  const handleClear = () => {
    setNum1(["", "", "", "", "", "", "", ""]);
    setNum2(["+", "", "", "", "", "", "", ""]);
    setUserAnswer(Array(8).fill(""));
    setCarry(Array(8).fill(""));
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

      {/* Botones */}
      {!operationStarted && (
        <button onClick={handleStartOperation}>Ingresar operación</button>
      )}
      {feedback && <p>{feedback}</p>}
      {showCompletionMessage ? (
        <h2>¡Bien hecho! Has completado todos los ejercicios.</h2>
      ) : (
        <button onClick={handleCheckAnswer}>Comprobar Respuesta</button>
      )}
      <button onClick={handleClear}>Limpiar</button>
      <button onClick={handleClearCarry}>Limpiar Acarreo</button>
      <button onClick={() => navigate("/games")}>Regresar</button>
    </div>
  );
};

export default GameComponent;
