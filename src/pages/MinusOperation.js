import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MultiplicationOperation.css";

const SubtractionOperation = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [exerciseCount, setExerciseCount] = useState(0);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  const [num1, setNum1] = useState(["", "", "", "", "", "", ""]);
  const [num2, setNum2] = useState(["", "", "", "", "", ""]);
  const [userAnswer, setUserAnswer] = useState(Array(7).fill(""));
  const [carry, setCarry] = useState(Array(7).fill(""));
  const [operationStarted, setOperationStarted] = useState(false);
  const [showResultLine, setShowResultLine] = useState(false); // Estado para la línea de resultado

  // Estados para mostrar las etiquetas
  const [showMinuendoLabel, setShowMinuendoLabel] = useState(false);
  const [showSustraendoLabel, setShowSustraendoLabel] = useState(false);
  const [showResultadoLabel, setShowResultadoLabel] = useState(false);

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
    setShowResultadoLabel(true); // Muestra la etiqueta después de verificar
    setExerciseCount((prevCount) => prevCount + 1);

    if (exerciseCount + 1 >= 100) {
      setShowCompletionMessage(true);
    }
  } else {
    setFeedback('Incorrecto. La respuesta correcta es ${correctAnswer}.');
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
      {/* Tabla para ingresar los números */}
      <div className="table-container">
        <table className="operation-table carry_row">
          <thead>
            <tr>
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
              {carry.map((digit, index) => (
                <td key={index}>
                  <input
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleCarryChange(index, e.target.value)}
                    placeholder={["ll", "e", "v", "a", "d", "a", "s"][index]} // Placeholder con las letras de "llevada"
                  />
                </td>
              ))}
            </tr>
            <tr
              onMouseEnter={() => setShowMinuendoLabel(true)}
              onMouseLeave={() => setShowMinuendoLabel(false)}
            >
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
              {showMinuendoLabel && <td className="label">Minuendo</td>}
            </tr>
            <tr
              onMouseEnter={() => setShowSustraendoLabel(true)}
              onMouseLeave={() => setShowSustraendoLabel(false)}
            >
              <td className="multiplication-sign">—</td>{" "}
              {/* Agregamos una celda con el signo */}
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
              {showSustraendoLabel && <td className="label">Sustraendo</td>}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Línea divisoria visible solo cuando operationStarted es true */}
      {showResultLine && (
        <tr>
          <td colSpan="7" className="result-line">
            ---------------------------------------------------------------------------------------------------------
          </td>
        </tr>
      )}

      {/* Tabla para ingresar el resultado */}
      {operationStarted && (
        <div className="table-container">
          <table className="operation-table">
            <tbody>
              <tr
           
                onMouseLeave={() => setShowResultadoLabel(false)}
              >
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
                {showResultadoLabel && <td className="label">Resultado</td>}
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
        <button onClick={() => navigate("/games")}>Regresar</button>
      </div>
    </div>
  );
};

export default SubtractionOperation;