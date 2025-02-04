import React from "react";
import  { Link } from "react-router-dom";
import "../styles/DivisionPage.css";
import DivisionOperation from "./DivisionOperation";

function DivisionPage() {
  return (
    <div className="division-page">
      <div className="division-page__grid">
        <header className="division-page__header">
          <h1>División de Números</h1>
        </header>

        <nav className="division-page__nav">
          <h2 className="division-page__nav-title">Elige otra operación</h2>
          <ul className="division-page__nav-list">
            <li><Link className="division-page__nav-link" to="/AdditionPage">Sumas</Link></li>
            <li><Link className="division-page__nav-link" to="/MinusPage">Restas</Link></li>
            <li><Link className="division-page__nav-link" to="/Multiplicaciones">Multiplicación</Link></li>
            <li><Link className="division-page__nav-link" to="/DivisionPage">División</Link></li>
          </ul>
        </nav>

        <main className="division-page__main">
          <h2>Resuelve la siguiente división:</h2>
          <div className="division-page__operation">{DivisionOperation()}</div>
        </main>

        <footer className="division-page__footer">
          <p>UCACUE GRUPO 3 © Copyright 2025</p>
        </footer>
      </div>
    </div>
  );
}

export default DivisionPage;
