import React from 'react';
import './styles.scss';
import logo from '../../assets/fondoNP.png'
import { useTranslation } from "react-i18next";

const FAQPage = () => {
  const { t } = useTranslation()
  return (
    <div className='all_content' >
      <h1 >{t("titleFAQ")}</h1>
      <hr />
      <section >
        <h2 className='title'>{t("FAQ1")}</h2>
        <p>{t("resFAQ1")}</p>
      </section>

      <section>
        <h2 className='title'>{t("FAQ2")}</h2>
        <p>{t("resFAQ2")}</p>
      </section>

      <section >
        <h2 className='title'>{t("FAQ3")}</h2>
        <p>{t("resFAQ3")}</p>
      </section>

      <section >
        <h2 className='title'>{t("FAQ4")}</h2>
        <p>{t("resFAQ4")}</p>
      </section>
      <h2>{t("welcome")}</h2>
      <div className='img_logofaq'>
        <img src={logo} className='imagenLogo' alt="logo" />
      </div>

    </div>
  );
};

export default FAQPage;