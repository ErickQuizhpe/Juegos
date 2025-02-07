import React, { useState } from "react";
import styles from "../styles/OperacionesAgrupacion.module.css";
import { useNavigate } from "react-router-dom";

const OperacionInput = ({ onOperacionSubmit, onLimpiar }) => {
  const [operacion, setOperacion] = useState("");
  const [error, setError] = useState(""); // Estado para manejar errores
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9+\-*/(){}\[\] ]*$/;

    if (regex.test(value)) {
      setOperacion(value);
      setError(""); // Limpiar errores al escribir correctamente
    }
  };

  // Función para validar signos de agrupación
  const validarAgrupacionBalanceada = (operacion) => {
    const stack = [];
    const pares = { "(": ")", "[": "]", "{": "}" };

    for (let char of operacion) {
      if (pares[char]) {
        stack.push(char); // Agregar apertura al stack
      } else if (Object.values(pares).includes(char)) {
        if (stack.length === 0 || pares[stack.pop()] !== char) {
          return false; // Agrupación incorrecta
        }
      }
    }
    return stack.length === 0; // El stack debe estar vacío si está balanceado
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar si no contiene ningún signo de agrupación
    const tieneAgrupacion = /[(){}\[\]]/.test(operacion);
    if (!tieneAgrupacion) {
      setError("Error: La operación debe incluir al menos un signo de agrupación.");
      return;
    }

    const validarOperacionCompleta = (operacion) => {
      const regex = /[+\-*/]$/;
      return !regex.test(operacion); // Retorna falso si la operación termina con un operador
    };
    

    // Validar si los signos de agrupación están balanceados
    if (!validarAgrupacionBalanceada(operacion)) {
      setError("Error: Los signos de agrupación no están correctamente cerrados.");
      return;
    }

    // Validar si la operación termina con un operador
    if (!validarOperacionCompleta(operacion)) {
      setError("Error: La operación no puede terminar con un operador.");
      return;
    }

    // Validación pasada, enviar operación
    setError(""); // Limpiar cualquier mensaje de error previo
    onOperacionSubmit(operacion);
  };

  const handleClear = () => {
    setOperacion("");
    setError(""); // Limpiar errores al limpiar
    if (onLimpiar) {
      onLimpiar();
    }
  };

  return (
    <form className={styles.formStyle} onSubmit={handleSubmit}>
      <input
        className={styles.operacionInput}
        type="text"
        value={operacion}
        onChange={handleInputChange}
        placeholder="Ingresa una Operación ✍ "
      />
      <button className={styles.buttonStyle} type="submit">
        Ingresar Operación
      </button>
      <button
        type="button"
        className={styles.buttonStyle}
        onClick={handleClear}
      >
        Nueva Operación
      </button>
      <button
        type="button"
        className={styles.buttonStyle}
        onClick={() => navigate("/")}
      >
        Salir
      </button>
      {error && <p className={styles.incorrect}>{error}</p>}
    </form>
  );
};

const Paso = ({ paso, pregunta, respuestaCorrecta, onRespuestaSubmit }) => {
  const [respuesta, setRespuesta] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleRespuestaChange = (e) => {
    setRespuesta(e.target.value);
  };

  const handleRespuestaSubmit = (e) => {
    e.preventDefault();
    const resultado = evaluarRespuesta(respuesta);
    const feedbackMessage =
      resultado === respuestaCorrecta
        ? "¡Correcto!"
        : "Incorrecto, intenta nuevamente.";
    setFeedback(feedbackMessage);
    onRespuestaSubmit(paso, resultado === respuestaCorrecta);
  };

  const evaluarRespuesta = (respuesta) => {
    try {
      const resultado = eval(respuesta);
      return resultado;
    } catch (error) {
      return null;
    }
  };

  return (
    <div className={styles.paso}>
      <p>{`Paso ${paso}: ${pregunta}`}</p>
      <form onSubmit={handleRespuestaSubmit}>
        <input
          type="text"
          value={respuesta}
          onChange={handleRespuestaChange}
          placeholder={`Respuesta al paso ${paso}`}
        />
        <button className={styles.buttonStyle} type="submit">
          Enviar Respuesta
        </button>
      </form>
      {feedback && (
        <p
          className={
            feedback === "¡Correcto!" ? styles.correct : styles.incorrect
          }
        >
          {feedback}
        </p>
      )}
    </div>
  );
};

const Juego = () => {
  const [operacion, setOperacion] = useState("");
  const [pasos, setPasos] = useState([]);
  const [todosLosPasosCorrectos, setTodosLosPasosCorrectos] = useState(false);
  const [operacionFinalCorrecta, setOperacionFinalCorrecta] = useState(false);

  const handleOperacionSubmit = (operacion) => {
    const operacionesDivididas = dividirOperacionEnPasos(operacion);
    setOperacion(operacion);
    setPasos(operacionesDivididas);
    setTodosLosPasosCorrectos(false); // Reseteamos la verificación de pasos correctos
    setOperacionFinalCorrecta(false); // Reseteamos el estado del resultado final
  };

  const manejarRespuestaPaso = (paso, esCorrecto) => {
    // Verificamos si todos los pasos son correctos
    if (esCorrecto) {
      // Verificar si todos los pasos han sido respondidos correctamente
      const todosCorrectos = pasos.every((pasoData) => {
        return pasoData.respuesta === pasoData.respuestaCorrecta;
      });
      setTodosLosPasosCorrectos(todosCorrectos);
    }
  };

  const dividirOperacionEnPasos = (operacion) => {
    const regexAgrupaciones = /(\[.*?\]|\{.*?\}|\(.*?\))/g;
    const cantidadAgrupaciones = (operacion.match(regexAgrupaciones) || [])
      .length;

    const pasosGenerados = [];
    let operacionTemp = operacion;

    for (let i = 1; i <= cantidadAgrupaciones; i++) {
      const agrupacion = operacionTemp.match(regexAgrupaciones)[0];
      const pregunta = `Resuelve la operación dentro de la agrupación: ${agrupacion}`;

      const contenidoAgrupacion = agrupacion.slice(1, -1);
      const resultado = eval(contenidoAgrupacion);

      pasosGenerados.push({
        paso: i,
        pregunta,
        respuestaCorrecta: resultado,
      });

      operacionTemp = operacionTemp.replace(agrupacion, resultado);
    }

    pasosGenerados.push({
      paso: cantidadAgrupaciones + 1,
      pregunta: `Resuelve la operación completa: ${operacionTemp}`,
      respuestaCorrecta: eval(operacionTemp),
    });

    return pasosGenerados;
  };

  const handleLimpiar = () => {
    setOperacion("");
    setPasos([]);
    setTodosLosPasosCorrectos(false);
    setOperacionFinalCorrecta(false);
  };

  const verificarOperacionFinal = () => {
    const resultadoFinal = eval(operacion);
    const resultadoPasoFinal = pasos[pasos.length - 1].respuestaCorrecta;
    if (resultadoFinal === resultadoPasoFinal) {
      setOperacionFinalCorrecta(true);
    }
  };

  // Llamar a verificarOperacionFinal después de enviar todas las respuestas
  React.useEffect(() => {
    if (todosLosPasosCorrectos) {
      verificarOperacionFinal();
    }
  }, [todosLosPasosCorrectos]);

  return (
    <div className={styles.container}>
      <h1 className="font-bold text-5xl text-blue-800 text-center">
        Operaciones con Agrupaciones
      </h1>
      <OperacionInput
        onOperacionSubmit={handleOperacionSubmit}
        onLimpiar={handleLimpiar}
      />

      {pasos.length > 0 && (
        <div>
          {pasos.map((pasoData, index) => (
            <Paso
              key={index}
              paso={pasoData.paso}
              pregunta={pasoData.pregunta}
              respuestaCorrecta={pasoData.respuestaCorrecta}
              onRespuestaSubmit={manejarRespuestaPaso}
            />
          ))}
        </div>
      )}

      {/* Cuadro emergente con la operación y su resultado */}
      {operacionFinalCorrecta && (
        <div className={styles.finalMessage}>
          <p className="text-green-500 font-bold">
            ¡Felicidades! La operación es correcta: <br />
            <span className="text-xl">
              {operacion} = {eval(operacion)}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Juego;