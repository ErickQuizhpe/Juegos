import React from "react";
import "../styles/MultiplicationPage.css";
import DivisionOperation from "./DivisionOperation";

function DivisionPage() {
  return (
    <div>
      <div className="bg-gray-100 min-h-screen">
        {/* Header */}
        <header className="header bg-blue-600 text-white py-3 text-center shadow-md">
          <h1 className="text-6xl font-bold">División de Números</h1>
        </header>

        <div className="grid">
          {/* Navigation */}
          <nav className="nav">
            <h2>Elige otra operación</h2>
            <ul>
              <li>
                <a href="#">Sumas</a>
              </li>
              <li>
                <a href="#">Restas</a>
              </li>
              <li>
                <a href="#">Multiplicación</a>
              </li>
              <li>
                <a href="#">División</a>
              </li>
            </ul>
          </nav>

          {/* Main Content */}
          <main className="main">
           
            <div className="cuadricula">{DivisionOperation()}</div>
          </main>

          {/* Aside Section
          <aside className="aside bg-pink-200 rounded-md shadow-lg p-6">
            <h2 className="text-3xl font-semibold mb-3">Ayuda para sumar</h2>
            < />
          </aside> */}

          <footer className="footer bg-gray-800 text-white py-4 text-center">
            <p>UCACUE GRUPO 3 © Copyright 2025</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default DivisionPage;
