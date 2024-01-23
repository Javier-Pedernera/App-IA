import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
// import { FcQuestions } from "react-icons/fc";
import { BsQuestionSquare } from "react-icons/bs";
const Footer = () => {
  return (
    <footer className="footer">
     
      <Link to="/faq" className="footer__link"> 
      {/* <FcQuestions style={{height:"100%"}}/>  */}
      <BsQuestionSquare style={{marginRight:"5px"}} />
      Preguntas Frecuentes</Link>
      <p>&copy; 2024 NutriPlan IA. Todos los derechos reservados.</p>
      
    </footer>
  );
};

export default Footer;