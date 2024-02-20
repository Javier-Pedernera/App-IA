import React from 'react';
import './Loader.css'; // Importa el archivo de estilos CSS

const Loader = () => {
    return (
        <div className="loader-overlay">
            <div className="loaderlanding"></div>
            <div className='loading_text'>Loading...</div>
        </div>
    );
};

export default Loader;