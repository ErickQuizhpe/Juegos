import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/GameComponent.css";

const GameComponent = () => {
  const { operation } = useParams(); // Obtiene el tipo de operación
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [exerciseCount, setExerciseCount] = useState(0); // Contador de ejercicios
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  const generateRandomNumber = () => Math.floor(Math.random() * 1000000); // Número aleatorio de hasta 6 cifras
  const [num1, setNum1] = useState(generateRandomNumber());
  const [num2, setNum2] = useState(generateRandomNumber());
  const [userAnswer, setUserAnswer] = useState(Array(6).fill("")); // Respuesta del usuario por dígito
  const [carry, setCarry] = useState(Array(6).fill("")); // Números llevados por dígito

  const calculateCorrectAnswer = () => {
    switch (operation) {
      case "addition":
        return num1 + num2;
      case "subtraction":
        return num1 - num2;
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
      // Genera nuevos números para el siguiente ejercicio
      setNum1(generateRandomNumber());
      setNum2(generateRandomNumber());
      setUserAnswer(Array(6).fill(""));
      setCarry(Array(6).fill(""));
    }
  };

  const handleAnswerChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      // Asegura que solo se pueda ingresar un número por casilla
      const updatedAnswer = [...userAnswer];
      updatedAnswer[index] = value;
      setUserAnswer(updatedAnswer);
    }
  };

  const handleCarryChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      // Asegura que solo se pueda ingresar un número por casilla
      const updatedCarry = [...carry];
      updatedCarry[index] = value;
      setCarry(updatedCarry);
    }
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

      {feedback && <p className="feedback">{feedback}</p>}

      {showCompletionMessage ? (
        <div className="completion-message">
          <h2>¡Bien hecho! 🎉 Has completado todos los ejercicios.</h2>
        </div>
      ) : (
        <button onClick={handleCheckAnswer} className="check-button">
          Comprobar
        </button>
      )}

      <button onClick={() => navigate("/games")} className="back-button">
        Regresar
      </button>
    </div>
  );
};

export default GameComponent;
