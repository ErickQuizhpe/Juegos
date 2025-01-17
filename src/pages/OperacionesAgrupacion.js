import React, { useState } from "react";
import styles from "../styles/OperacionesAgrupacion.module.css";

const OperacionInput = ({ onOperacionSubmit, onLimpiar }) => {
  const [operacion, setOperacion] = useState("");

  // Función para validar la operación ingresada
  const handleInputChange = (e) => {
    const value = e.target.value;

    // Expresión regular para permitir solo números, paréntesis, corchetes y operadores matemáticos
    const regex = /^[0-9+\-*/(){}\[\] ]*$/;

    if (regex.test(value)) {
      setOperacion(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onOperacionSubmit(operacion);
  };

  const handleClear = () => {
    setOperacion("");
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
        onChange={handleInputChange} // Usamos la nueva función para validar
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
    onRespuestaSubmit(paso, resultado);
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

  const handleOperacionSubmit = (operacion) => {
    const operacionesDivididas = dividirOperacionEnPasos(operacion);
    setOperacion(operacion);
    setPasos(operacionesDivididas);
  };

  const manejarRespuestaPaso = (paso, respuesta) => {
    console.log(`Respuesta al paso ${paso}: ${respuesta}`);
  };

  const dividirOperacionEnPasos = (operacion) => {
    // Expresiones regulares para buscar paréntesis, corchetes y llaves
    const regexAgrupaciones = /(\[.*?\]|\{.*?\}|\(.*?\))/g;

    // Contamos cuántas agrupaciones existen
    const cantidadAgrupaciones = (operacion.match(regexAgrupaciones) || []).length;

    const pasosGenerados = [];
    let operacionTemp = operacion;

    // Procesamos cada agrupación
    for (let i = 1; i <= cantidadAgrupaciones; i++) {
      const agrupacion = operacionTemp.match(regexAgrupaciones)[0];
      const pregunta = `Resuelve la operación dentro de la agrupación: ${agrupacion}`;
      
      // Evaluamos el contenido de la agrupación eliminando las llaves, corchetes o paréntesis
      const contenidoAgrupacion = agrupacion.slice(1, -1); 
      const resultado = eval(contenidoAgrupacion);  // Evaluamos la expresión dentro de la agrupación

      pasosGenerados.push({
        paso: i,
        pregunta,
        respuestaCorrecta: resultado,
      });

      // Reemplazamos la agrupación con el resultado en la operación
      operacionTemp = operacionTemp.replace(agrupacion, resultado);
    }

    // Añadimos el paso final con la operación resuelta
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
  };

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
    </div>
  );
};

export default Juego;
