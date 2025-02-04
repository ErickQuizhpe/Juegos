import React from "react";
import "../styles/MinusPage.css";
import MinusTable from "./MinusTable";
import MinusOperation from "./MinusOperation";
import { Link } from "react-router-dom";

function MinusPage() {
  return (
    <div className="minus-page">
      <div className="minus-page__grid">
        <header className="minus-page__header">
          <h1>Resta de Números</h1>
        </header>

        <nav className="minus-page__nav">
          <h2 className="minus-page__nav-title">Elige otra operación</h2>
          <ul className="minus-page__nav-list">
            <li><Link className="minus-page__nav-link" to="/AdditionPage">Sumas</Link></li>
            <li><Link className="minus-page__nav-link" to="/MinusPage">Restas</Link></li>
            <li><Link className="minus-page__nav-link" to="/Multiplicaciones">Multiplicación</Link></li>
            <li><Link className="minus-page__nav-link" to="/DivisionPage">División</Link></li>
          </ul>
        </nav>

        <main className="minus-page__main">
          <h2>Resuelve la siguiente resta:</h2>
          <div className="minus-page__grid">{MinusOperation()}</div>
        </main>

        <aside className="minus-page__aside">
          <h2>Ayuda para restar</h2>
          <MinusTable />
        </aside>

        <footer className="minus-page__footer">
          <p>UCACUE GRUPO 3 © Copyright 2025</p>
        </footer>
      </div>
    </div>
  );
}

export default MinusPage;
