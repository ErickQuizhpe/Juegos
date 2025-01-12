import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/GameComponent.css";

const GameComponent = () => {
  const { operation } = useParams(); // Obtiene el tipo de operación
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(""); // Retroalimentación al usuario
  const [exerciseCount, setExerciseCount] = useState(0); // Contador de ejercicios
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [userAnswer, setUserAnswer] = useState(Array(6).fill("")); // Respuesta del usuario por dígito
  const [carry, setCarry] = useState(Array(6).fill("")); // Números llevados por dígito

  const [num1, setNum1] = useState(""); // Número ingresado por el usuario 1
  const [num2, setNum2] = useState(""); // Número ingresado por el usuario 2
  const [isGameStarted, setIsGameStarted] = useState(false); // Controla el inicio del juego

  const calculateCorrectAnswer = () => {
    switch (operation) {
      case "addition":
        return parseInt(num1) + parseInt(num2);
      case "subtraction":
        return parseInt(num1) - parseInt(num2);
      default:
        return null;
    }
  };

  const handleCheckAnswer = () => {
    const correctAnswer = calculateCorrectAnswer()
      .toString()
      .padStart(6, "0")
      .split(""); // Obtiene los dígitos de la respuesta correcta
    const userResponse = userAnswer.map((digit) => digit || "0"); // Llena espacios vacíos con 0

    if (JSON.stringify(userResponse) === JSON.stringify(correctAnswer)) {
      setFeedback("¡Correcto! 🎉");
    } else {
      setFeedback(
        `Incorrecto. La respuesta correcta es ${correctAnswer.join("")}.`
      );
    }

    setExerciseCount(exerciseCount + 1);

    if (exerciseCount >= 9) {
      setShowCompletionMessage(true);
    } else {
      // Reinicia las respuestas para el siguiente ejercicio
      setUserAnswer(Array(6).fill(""));
      setCarry(Array(6).fill(""));
    }
  };

  const handleAnswerChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const updatedAnswer = [...userAnswer];
      updatedAnswer[index] = value;
      setUserAnswer(updatedAnswer);
    }
  };

  const handleCarryChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const updatedCarry = [...carry];
      updatedCarry[index] = value;
      setCarry(updatedCarry);
    }
  };

  const handleStartGame = () => {
    // Validación básica para asegurarse de que se ingresen números válidos
    if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
      setFeedback("Por favor ingresa números válidos.");
      return;
    }

    setFeedback(""); // Limpia mensajes previos
    setIsGameStarted(true); // Inicia el juego
  };

  const formatNumber = (num) => {
    const str = num.toString().padStart(6, " "); // Rellena espacios vacíos si el número tiene menos de 6 dígitos
    return str.split(""); // Divide los dígitos en un array
  };

  return (
    <div className="game-component">
      <h1>
        Juego de{" "}
        {operation === "addition"
          ? "Suma"
          : operation === "subtraction"
          ? "Resta"
          : ""}
      </h1>

      {!isGameStarted ? (
        <div className="number-inputs">
          <h2>Ingresa los números para el ejercicio:</h2>
          <div className="input-group">
            <label htmlFor="num1">Número 1:</label>
            <input
              id="num1"
              type="text"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="num2">Número 2:</label>
            <input
              id="num2"
              type="text"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
            />
          </div>
          <button onClick={handleStartGame} className="start-button">
            Comenzar
          </button>
        </div>
      ) : (
        <div className="table-container">
          <div className="operation-symbol">
            {operation === "addition" ? "+" : "-"}
          </div>
          <table className="operation-table">
            <thead>
              <tr>
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
                      className="carry-input"
                    />
                  </td>
                ))}
              </tr>
              <tr>
                {formatNumber(num1).map((digit, index) => (
                  <td key={index}>{digit}</td>
                ))}
              </tr>
              <tr>
                {formatNumber(num2).map((digit, index) => (
                  <td key={index}>{digit}</td>
                ))}
              </tr>
              <tr>
                <td colSpan="6" className="result-line">
                  ____________________________________________________________
                </td>
              </tr>
              <tr>
                {userAnswer.map((digit, index) => (
                  <td key={index}>
                    <input
                      type="text"
                      maxLength="1"
                      value={digit}
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

      {feedback && <p className="feedback">{feedback}</p>}

      {isGameStarted && !showCompletionMessage && (
        <button onClick={handleCheckAnswer} className="check-button">
          Comprobar
        </button>
      )}

      {showCompletionMessage && (
        <div className="completion-message">
          <h2>¡Bien hecho! 🎉 Has completado todos los ejercicios.</h2>
        </div>
      )}

      <button onClick={() => navigate("/games")} className="back-button">
        Regresar
      </button>
    </div>
  );
};

export default GameComponent;
