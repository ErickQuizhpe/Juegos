import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GameComponent.css";

const GameComponent = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [exerciseCount, setExerciseCount] = useState(0); // Contador de ejercicios
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  const [num1, setNum1] = useState(["", "", "", "", "", "", ""]); 
  const [num2, setNum2] = useState(["__", "", "", "", "", "", ""]); 
  const [userAnswer, setUserAnswer] = useState(Array(7).fill("")); 
  const [carry, setCarry] = useState(Array(7).fill("")); 

  const calculateCorrectAnswer = () => {
    const num1Int = parseInt(num1.join(""), 10);
    const num2Int = parseInt(num2.join(""), 10);
    return num1Int - num2Int;
  };

  const handleCheckAnswer = () => {
    const correctAnswer = calculateCorrectAnswer()
      .toString()
      .padStart(7, "0")
      .split(""); 
    const userResponse = userAnswer.map((digit) => digit || "0");

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
      setNum1(["", "", "", "", "", "", ""]); 
      setNum2(["__", "", "", "", "", "", ""]); 
      setUserAnswer(Array(7).fill("")); 
      setCarry(Array(7).fill("")); 
    }
  };

  const handleNumberChange = (index, value, numType) => {
    if (/^\d?$/.test(value)) {
      const updatedNum = numType === "num1" ? [...num1] : [...num2];
      updatedNum[index] = value;
      numType === "num1" ? setNum1(updatedNum) : setNum2(updatedNum);
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

  const formatNumber = (num) => {
    return num.split("");
  };

  return (
    <div className="game-component">
      <h1 className="title">¡Vamos a Restar!</h1>
      
      <div className="table-container">
        <div className="operation-symbol">-</div>
        <table className="operation-table">
          <thead>
            <tr>
              <th></th>  
              <th>CM</th>
              <th>DM</th>
              <th>UM</th>
              <th>C</th>
              <th>D</th>
              <th>U</th>
            </tr>
          </thead>
          <tbody>
            <tr className="carry-row">
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
              {num1.map((digit, index) => (
                <td key={index}>
                  <input
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleNumberChange(index, e.target.value, "num1")}
                    className="number-input"
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
                    onChange={(e) => handleNumberChange(index, e.target.value, "num2")}
                    className="number-input"
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td colSpan="7" className="result-line">
                __________________________________________________________________
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
