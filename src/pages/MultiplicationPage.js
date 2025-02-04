import React from "react";
import MultiplicacionDisco from "./MultiplicationTable";
import MultiplicacionOperacion from "./MultiplicationOperation";
import { Link } from "react-router-dom";
import "../styles/MultiplicationPage1.css";

function MultiplicationPage() {
  return (
    <div className="multiplication-page">
      <div className="multiplication-page__grid">
        <header className="multiplication-page__header">
          <h1>Multiplicación de Números</h1>
        </header>

        <nav className="multiplication-page__nav">
          <h2 className="multiplication-page__nav-title">Elige otra operación</h2>
          <ul className="multiplication-page__nav-list">
            <li><Link className="multiplication-page__nav-link" to="/AdditionPage">Sumas</Link></li>
            <li><Link className="multiplication-page__nav-link" to="/MinusPage">Restas</Link></li>
            <li><Link className="multiplication-page__nav-link" to="/Multiplicaciones">Multiplicación</Link></li>
            <li><Link className="multiplication-page__nav-link" to="/DivisionPage">División</Link></li>
          </ul>
        </nav>

        <main className="multiplication-page__main">
          <h2>Resuelve la siguiente multiplicación:</h2>
          <div className="multiplication-page__operation">
            {MultiplicacionOperacion()}
          </div>
        </main>

        <aside className="multiplication-page__aside">
          <h2>Ayuda para multiplicar</h2>
          <MultiplicacionDisco />
        </aside>

        <footer className="multiplication-page__footer">
          <p>UCACUE GRUPO 3 © Copyright 2025</p>
        </footer>
      </div>
    </div>
  );
}

export default MultiplicationPage;
