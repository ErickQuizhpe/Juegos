import React from "react";
import "../styles/AdditionPage.css";
import "../styles/AdditionOperation.css";
import AdditionOperacion from "./AdditionOperation";
import AdditionTable from "./AdditionTable";
import { Link } from "react-router-dom";

function AdditionPage() {
  return (
    <div className="addition-page">
      <div className="addition-page__grid">
        <header className="addition-page__header">
          <h1>Suma de Números</h1>
        </header>

        <nav className="addition-page__nav">
          <h2 className="addition-page__nav-title">Elige otra operación</h2>
          <ul>
            <li><Link className="addition-page__nav-link" to="/AdditionPage">Sumas</Link></li>
            <li><Link className="addition-page__nav-link" to="/MinusPage">Restas</Link></li>
            <li><Link className="addition-page__nav-link" to="/Multiplicaciones">Multiplicación</Link></li>
            <li><Link className="addition-page__nav-link" to="/DivisionPage">División</Link></li>
          </ul>
        </nav>

        <main className="addition-page__main">
          <h2>Resuelve la siguiente suma:</h2>
          <div className="addition-page__grid">{AdditionOperacion()}</div>
        </main>

        <aside className="addition-page__aside">
          <h2>Ayuda para sumar</h2>
          <AdditionTable />
        </aside>

        <footer className="addition-page__footer">
          <p>UCACUE GRUPO 3 © Copyright 2025</p>
        </footer>
      </div>
    </div>
  );
}

export default AdditionPage;
