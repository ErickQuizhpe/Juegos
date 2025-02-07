import React from "react";
import  { Link } from "react-router-dom";
import "../styles/MultiplicationPage.css";
import "../styles/DivisionPage.css";
import DivisionOperation from "./DivisionOperation";

function DivisionPage() {
  return (
    <div>
      <div className="division-page">
        {/* Header */}
        <header className="division-page__header ">
          <h1 className="text-6xl font-bold">División de Números</h1>
        </header>

        <div className="grid">
          {/* Navigation */}
          <nav className="division-page__nav">
            <h2 className="division-page__nav-title">Elige otra operación</h2>
            <ul>
              <li><Link className="division-page__nav-link" to="/AdditionPage">Sumas</Link></li>
              <li><Link className="division-page__nav-link" to="/MinusPage">Restas</Link></li>
              <li><Link className="division-page__nav-link" to="/Multiplicaciones">Multiplicación</Link></li>
              <li><Link className="division-page__nav-link" to="/DivisionPage">División</Link></li>
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

          <footer className="division-page__footer">
            <p>UCACUE GRUPO 3 © Copyright 2025</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default DivisionPage;
