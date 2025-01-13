import React, { useState } from 'react';
import '../styles/OperacionesAgrupacion.css';

const OperacionInput = ({ onOperacionSubmit }) => {
  const [operacion, setOperacion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onOperacionSubmit(operacion);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={operacion}
        onChange={(e) => setOperacion(e.target.value)}
        placeholder="Ingresa la operación"
      />
      <button type="submit">Enviar Operación</button>
    </form>
  );
};

const Paso = ({ paso, pregunta, respuestaCorrecta, onRespuestaSubmit }) => {
  const [respuesta, setRespuesta] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleRespuestaChange = (e) => {
    setRespuesta(e.target.value);
  };

  const handleRespuestaSubmit = (e) => {
    e.preventDefault();
    const resultado = evaluarRespuesta(respuesta);
    const feedbackMessage = resultado === respuestaCorrecta ? '¡Correcto!' : 'Incorrecto, intenta nuevamente.';
    setFeedback(feedbackMessage);
    onRespuestaSubmit(paso, resultado);
  };

  const evaluarRespuesta = (respuesta) => {
    try {
      // Evaluar la respuesta ingresada por el estudiante
      const resultado = eval(respuesta);
      return resultado;
    } catch (error) {
      return null; // Si la evaluación falla, se considera incorrecta
    }
  };

  return (
    <div className="paso">
      <p>{`Paso ${paso}: ${pregunta}`}</p>
      <form onSubmit={handleRespuestaSubmit}>
        <input
          type="text"
          value={respuesta}
          onChange={handleRespuestaChange}
          placeholder={`Respuesta al paso ${paso}`}
        />
        <button type="submit">Enviar Respuesta</button>
      </form>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

const Juego = () => {
  const [operacion, setOperacion] = useState('');
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
    // Contar la cantidad de signos de agrupación (paréntesis) en la operación
    const regex = /\(/g;
    const cantidadAgrupaciones = (operacion.match(regex) || []).length;

    const pasosGenerados = [];

    // Generar pasos para cada agrupación de paréntesis
    let operacionTemp = operacion;
    for (let i = 1; i <= cantidadAgrupaciones; i++) {
      const regexPaso = /\(([^()]+)\)/;
      const pasoOperacion = operacionTemp.match(regexPaso);

      if (pasoOperacion) {
        const pregunta = `Resuelve la operación dentro de los paréntesis: ${pasoOperacion[1]}`;
        const resultado = eval(pasoOperacion[1]);
        pasosGenerados.push({
          paso: i,
          pregunta,
          respuestaCorrecta: resultado,
        });

        // Reemplazar la operación con el resultado
        operacionTemp = operacionTemp.replace(pasoOperacion[0], resultado);
      }
    }

    // Paso final: Resolver la operación completa después de todos los pasos intermedios
    pasosGenerados.push({
      paso: cantidadAgrupaciones + 1,
      pregunta: `Resuelve la operación completa: ${operacionTemp}`,
      respuestaCorrecta: eval(operacionTemp),
    });

    return pasosGenerados;
  };

  const handleLimpiar = () => {
    setOperacion('');
    setPasos([]);
  };

  return (
    <div>
      <h1>Juego de Resolución de Operaciones</h1>
      <OperacionInput onOperacionSubmit={handleOperacionSubmit} />
      <button onClick={handleLimpiar}>Limpiar</button>
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
