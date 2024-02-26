import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
// import { FcQuestions } from "react-icons/fc";
import { BsQuestionSquare } from "react-icons/bs";
import { useTranslation } from "react-i18next";
const Footer = () => {
 
const { t } = useTranslation();
  return (
    <footer className="footer">
     
      <Link to="/faq" className="footer__link"> 
      {/* <FcQuestions style={{height:"100%"}}/>  */}
      <BsQuestionSquare style={{marginRight:"5px"}} />
      {t("titleFAQ")}</Link>
      <p>&copy; 2024 NutriPlan AI. Todos los derechos reservados.</p>
      
    </footer>
  );
};

export default Footer;