import React from "react";
import "../styles/Multiplicacion.css";
import MultiplicacionDisco from "./MultiplicacionDisco";
import Prueba from "./Prueba";

function Multiplicaciones() {
  return (
    <div>
      <div className="bg-gray-100 min-h-screen">
        {/* Header */}
        <header className=" header bg-blue-600 text-white py-3 text-center shadow-md">
          <h1 className="text-4xl font-bold">Multiplicación de Números</h1>
        </header>

        <div className="grid">
          {/* Navigation */}
          <nav className="nav bg-orange-300">
            <h2 className="text-xl font-semibold mb-4">Elige otra operación</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Sumas
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Restas
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Multiplicación
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  División
                </a>
              </li>
            </ul>
          </nav>

          {/* Main Content */}
          <main className="main">
            <h1 className="text-2xl font-bold mb-4">
              Resuelve el ejercicio a continuación
            </h1>
            <div className="cuadricula">{
              <Prueba/>
              
              }</div>
          </main>

          {/* Aside Section */}
          <aside
            className="aside bg-pink-200
      rounded-md shadow-lg p-6  hover:shadow-xl transition-shadow duration-300"
          >
            <h2
              className="text-3xl font-semibold mb-3
          txt-center"
            >
              Tablas de multiplicar
            </h2>
            <MultiplicacionDisco />
          </aside>

          {/* Footer
          <footer className="footer bg-gray-800 text-white py-4 text-center">
            <p>UCAUCUE © Copyright 2025</p>
          </footer> */}
        </div>
      </div>
    </div>
  );
}

export default Multiplicaciones;
