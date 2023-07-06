import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Header() {
  return (
    <div>
      <header className="header">
        <nav className="header-nav">
          <Link to="/" className="header-link">Início</Link>
          <Link to="/mangas" className="header-link">Mangás</Link>
          <Link to="/capitulos" className="header-link">Capitulos</Link>
          <Link to="/paginas" className="header-link">Páginas</Link>
        </nav>
      </header>
    </div>
  );
}

export default Header;
