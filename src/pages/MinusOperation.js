import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MultiplicationOperation.css";

const SubtractionOperation = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [exerciseCount, setExerciseCount] = useState(0);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  const [num1, setNum1] = useState(["", "", "", "", "", "", ""]);
  const [num2, setNum2] = useState(["", "", "", "", "", "", ""]);
  const [userAnswer, setUserAnswer] = useState(Array(7).fill(""));
  const [carry, setCarry] = useState(Array(7).fill(""));
  const [operationStarted, setOperationStarted] = useState(false);
  const [showResultLine, setShowResultLine] = useState(false); // Estado para la línea de resultado

  // Estados para mostrar las etiquetas
  const [showMinuendoLabel, setShowMinuendoLabel] = useState(null);
  const [showSustraendoLabel, setShowSustraendoLabel] = useState(null);
  const [showResultLabel, setShowResultLabel] = useState(false);

  const calculateCorrectAnswer = () => {
    const num1Value =
      parseInt(num1.filter((digit) => /^\d$/.test(digit)).join(""), 10) || 0;
    const num2Value =
      parseInt(num2.filter((digit) => /^\d$/.test(digit)).join(""), 10) || 0;
    return num1Value - num2Value;
  };

  const handleCarryChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const updatedCarry = [...carry];
      updatedCarry[index] = value;
      setCarry(updatedCarry);
    }
  };

  const handleNumberChange = (index, value, numType) => {
    if (/^\d?$/.test(value)) {
      const updatedNum = numType === "num1" ? [...num1] : [...num2];
      updatedNum[index] = value;
      numType === "num1" ? setNum1(updatedNum) : setNum2(updatedNum);
    }
  };

  const handleUserAnswerChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const updatedAnswer = [...userAnswer];
      updatedAnswer[index] = value;
      setUserAnswer(updatedAnswer);
    }
  };


const handleCheckAnswer = () => {
  const isNum1Valid = num1.some((digit) => /^\d$/.test(digit));
  const isNum2Valid = num2.some((digit) => /^\d$/.test(digit));
  const isUserAnswerValid = userAnswer.some((digit) => /^\d$/.test(digit));

  if (!isNum1Valid || !isNum2Valid || !isUserAnswerValid) {
    setFeedback(
      "Por favor, ingresa los números que deseas restar y el resultado antes de comprobar la respuesta."
    );
    return;
  }

  const correctAnswer = calculateCorrectAnswer();
  const userAnswerValue = parseInt(userAnswer.join(""), 10) || 0;

  if (userAnswerValue === correctAnswer) {
    setFeedback("¡Correcto! 🎉");
    setShowResultLabel(true);
    setExerciseCount((prevCount) => prevCount + 1);

    if (exerciseCount + 1 >= 100) {
      setShowCompletionMessage(true);
    }
  } else {
    setFeedback(`Incorrecto. La respuesta correcta es ${correctAnswer}.`);
  }
};


  const handleStartOperation = () => {
    const isNum1Valid = num1.some((digit) => /^\d$/.test(digit));
    const isNum2Valid = num2.some((digit) => /^\d$/.test(digit));

    if (isNum1Valid && isNum2Valid) {
      setCarry(Array(7).fill(""));
      setOperationStarted(true);
      setFeedback("");
      setShowResultLine(true); // Mostrar la línea cuando se inicie la operación
    } else {
      setFeedback("Por favor, ingresa los números que deseas restar.");
    }
  };

  const handleClear = () => {
    setNum1(["", "", "", "", "", "", ""]);
    setNum2(["", "", "", "", "", ""]);
    setUserAnswer(Array(7).fill(""));
    setCarry(Array(7).fill(""));
    setOperationStarted(false);
    setShowResultLine(false); // Ocultar la línea cuando se reinicie
    setFeedback("");
  };

  return (
    <div className="game-component">
      <div className="operation-container">
        {/* Tabla principal */}
        <div className="table-container">
          <table className="operation-table">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Cm</th>
                <th>Dm</th>
                <th>Um</th>
                <th>C</th>
                <th>D</th>
                <th>U</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                {carry.map((digit, index) => (
                  <td key={index}>
                    <input
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleCarryChange(index, e.target.value)}
                      placeholder={["ll", "e", "v", "a", "d", "a", "s"][index]}
                    />
                  </td>
                ))}
              </tr>
              <tr 
                className="term-row"
                onMouseEnter={() => setShowMinuendoLabel(0)}
                onMouseLeave={() => setShowMinuendoLabel(null)}
              >
                <td></td>
                {num1.map((digit, index) => (
                  <td key={index}>
                    <input
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleNumberChange(index, e.target.value, "num1")}
                    />
                  </td>
                ))}
                {showMinuendoLabel === 0 && (
                  <span className="term-label">Minuendo</span>
                )}
              </tr>
              <tr 
                className="term-row"
                onMouseEnter={() => setShowSustraendoLabel(1)}
                onMouseLeave={() => setShowSustraendoLabel(null)}
              >
                <td className="operation-symbol">—</td>
                {num2.map((digit, index) => (
                  <td key={index}>
                    <input
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleNumberChange(index, e.target.value, "num2")}
                    />
                  </td>
                ))}
                {showSustraendoLabel === 1 && (
                  <span className="term-label">Sustraendo</span>
                )}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Línea divisoria */}
        {showResultLine && (
          <div className="result-line-container">
            <span className="result-line">
            --------------------------------------------------------------------------------
            </span>
          </div>
        )}

        {/* Tabla de resultado */}
        {operationStarted && (
          <div className="table-container">
            <table className="operation-table">
              <tbody>
                <tr 
                  className="term-row"
                  onMouseEnter={() => setShowResultLabel(true)}
                  onMouseLeave={() => setShowResultLabel(false)}
                >
                  <td></td>
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
                  {showResultLabel && (
                    <span className="term-label">Resultado</span>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
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
          <button onClick={() => navigate("/")}>Volver</button>
        </div>
      </div>
    </div>
  );
};

export default SubtractionOperation;