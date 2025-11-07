import React from "react";
import "./App.css";

function Header() {
  return (
    <header>
      <a href="/" className="logo-link">
        <div className="logo">F O C U S</div>
      </a>

      <nav>
        <ul className="nav-menu">
          <li className="nav-item">
            <button className="nav-toggle">Hombre</button>
            <ul className="submenu">
              <li>
                <a href="#">Camisetas</a>
              </li>
              <li>
                <a href="#">Shorts</a>
              </li>
              <li>
                <a href="#">Sudaderas</a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <button className="nav-toggle">Accesorios</button>
            <ul className="submenu">
              <li>
                <a href="#">Gorros</a>
              </li>
              <li>
                <a href="#">Gafas</a>
              </li>
              <li>
                <a href="#">Anillos</a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <button className="nav-toggle">Re Stock</button>
            <ul className="submenu">
              <li>
                <a href="#">Novedades</a>
              </li>
              <li>
                <a href="#">Lo más vendido</a>
              </li>
              <li>
                <a href="#">Ediciones limitadas</a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <button className="nav-toggle">Blog</button>
            <ul className="submenu">
              <li>
                <a href="#">Tips de Vestimenta</a>
              </li>
              <li>
                <a href="#">Preguntas</a>
              </li>
              <li>
                <a href="#">Historias</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <div className="icon-bar">
        <button className="icon-btn" title="Buscar">
          <img
            src="https://i.pinimg.com/736x/79/ce/10/79ce10e4c34077215b988139aec41dbe.jpg"
            alt="Buscar"
            width="31px"
          />
        </button>
      </div>
    </header>
  );
}

export default Header;