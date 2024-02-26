import React from 'react';
import './Loader.css'; // Importa el archivo de estilos CSS
import { useTranslation } from 'react-i18next';

const Loader = () => {

    const { t } = useTranslation();

    return (
        <div className="loader-overlay">
            <div className="loaderlanding"></div>
            <div className='loading_text'>{t("Cargando")}</div>
        </div>
    );
};

export default Loader;