import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // Asegúrate de tener tu archivo de estilos para la barra de navegación
import logo from '../../assets/logo2.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        <img src={logo} alt="NutriPlan AI" className="navbar__logo" />
        {/* NutriPlan IA */}
      </Link>
    </nav>
  );
};

export default Navbar;