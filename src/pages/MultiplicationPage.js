import React from "react";
import "../styles/MultiplicationPage.css";
import MultiplicacionDisco from "./MultiplicationTable";
import MultiplicacionOperacion from "./MultiplicationOperation";
import { Link } from "react-router-dom";

function MultiplicationPage() {
  return (
    <div>
      <div className="bg-gray-100 min-h-screen">
        {/* Header */}
        <header className="header bg-blue-600 text-white py-3 text-center shadow-md">
          <h1 className="text-6xl font-bold">Multiplicación de Números</h1>
        </header>

        <div className="grid">
          {/* Navigation */}
          <nav className="nav">
            <h2>Elige otra operación</h2>
            <ul>
              <li>
                <Link to="/AdditionPage">Sumas</Link>
              </li>
              <li>
                <Link to="/MinusPage">Restas</Link>
              </li>
              <li>
                <Link to="/DivisionPage">División</Link>
              </li>
              <li>
                <Link to="/Multiplicaciones">Multiplicación</Link>
              </li>
            </ul>
          </nav>

          {/* Main Content */}
          <main className="main">
            <h2 className="text-2xl font-bold mb-4">
              Resuelve la siguiente multiplicación:
            </h2>
            <div className="cuadricula">{<MultiplicacionOperacion />}</div>
          </main>

          {/* Aside Section */}
          <aside className="aside bg-pink-200 rounded-md shadow-lg p-6">
            <h2 className="text-3xl font-semibold mb-3">Ayuda para Multiplicar</h2>
            <MultiplicacionDisco />
          </aside>

          <footer className="footer bg-gray-800 text-white py-4 text-center">
            <p>UCACUE GRUPO 3 © Copyright 2025</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default MultiplicationPage;
