import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MultiplicationOperation.css";
import "../styles/AdditionOperation.css";

const SumOperation = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [exerciseCount, setExerciseCount] = useState(0);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  const [termCount, setTermCount] = useState(0);
  const [terms, setTerms] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);
  const [carry, setCarry] = useState([]);
  const [operationStarted, setOperationStarted] = useState(false);
  const [showResultLine, setShowResultLine] = useState(false);

  const handleTermCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    if (count > 1 && count <= 10) {
      setTermCount(count);
      setTerms(Array(count).fill(Array(7).fill("")));
      setCarry(Array(7).fill(""));
      setUserAnswer(Array(7).fill(""));
      setOperationStarted(false);
      setFeedback("");
    } else {
      setFeedback("Por favor, ingresa un número de términos entre 2 y 10.");
    }
  };

  const handleNumberChange = (termIndex, digitIndex, value) => {
    if (/^\d?$/.test(value)) {
      const updatedTerms = terms.map((term, index) =>
        index === termIndex
          ? term.map((digit, i) => (i === digitIndex ? value : digit))
          : term
      );
      setTerms(updatedTerms);
    }
  };

  const handleCarryChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const updatedCarry = [...carry];
      updatedCarry[index] = value;
      setCarry(updatedCarry);
    }
  };

  const handleUserAnswerChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const updatedAnswer = [...userAnswer];
      updatedAnswer[index] = value;
      setUserAnswer(updatedAnswer);
    }
  };

  const calculateCorrectAnswer = () => {
    const sum = terms.reduce((acc, term) => {
      const termValue = parseInt(term.filter((digit) => digit !== "").join(""), 10) || 0;
      return acc + termValue;
    }, 0);
    return sum;
  };

  const handleCheckAnswer = () => {
    const isUserAnswerValid = userAnswer.some((digit) => /^\d$/.test(digit));

    if (!isUserAnswerValid) {
      setFeedback("Por favor, ingresa una respuesta antes de comprobar.");
      return;
    }

    const correctAnswer = calculateCorrectAnswer();
    const correctAnswerStr = correctAnswer.toString().padStart(7, "");
    const userAnswerStr = userAnswer.join("");

    if (userAnswerStr === correctAnswerStr) {
      setFeedback("¡Correcto! 🎉");
      setExerciseCount(exerciseCount + 1);
      if (exerciseCount >= 100) {
        setShowCompletionMessage(true);
      }
    } else {
      setFeedback(`Incorrecto. La respuesta correcta es ${correctAnswerStr}.`);
    }
  };

  const handleStartOperation = () => {
    const areTermsValid = terms.every((term) => term.some((digit) => /^\d$/.test(digit)));

    if (areTermsValid) {
      setOperationStarted(true);
      setShowResultLine(true);
      setFeedback("");
    } else {
      setFeedback("Por favor, ingresa los números para todos los términos antes de comenzar.");
    }
  };

  const handleClear = () => {
    setTerms(Array(termCount).fill(Array(7).fill("")));
    setUserAnswer(Array(7).fill(""));
    setCarry(Array(7).fill(""));
    setOperationStarted(false);
    setShowResultLine(false);
    setFeedback("");
  };

  return (
    <div className="game-component">
      
      <div>
        <label htmlFor="termCount">¿Cuantos números deseas sumar?:</label>
        <input className="term-number"
          type="number"
          id="termCount"
          value={termCount}
          onChange={handleTermCountChange}
          min="2"
          max="10"
        />
      </div>

      {termCount > 0 && (
        <>
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
                        placeholder={["ll", "e", "v", "a", "d", "a","s"][index]}
                        value={digit}
                        onChange={(e) => handleCarryChange(index, e.target.value)}
                      />
                    </td>
                  ))}

                </tr>
                {terms.map((term, termIndex) => (
                  <tr key={termIndex}>
                    <td className="operation-symbol">{termIndex === 1 ? " + " : ""}</td>
                    {term.map((digit, digitIndex) => (
                      <td key={digitIndex}>
                        <input
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) =>
                            handleNumberChange(termIndex, digitIndex, e.target.value)
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Línea divisoria entre tablas */}
          {showResultLine && (
            <tr>
              <td colSpan="7" className="result-line">
                ------------------------------------------------------------------------
              </td>
            </tr>
          )}

          {/* Tabla de ingreso de resultados */}
          {operationStarted && (
            <div className="table-container term-num">
              <table className="operation-table result-table">
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
          )}
        </>
      )}

      <div className="button-group">
        {!operationStarted && <button onClick={handleStartOperation}>Ingresar operación</button>}
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
  );
};

export default SumOperation;
