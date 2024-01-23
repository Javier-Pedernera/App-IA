import React from 'react';

const FAQPage = () => {
    return (
        <div style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px', height:"100%", width:"100%" }}>
          <h1 style={{ color: '#333', marginBottom: '20px' }}>Preguntas Frecuentes</h1>
    
          <section style={{ marginBottom: '20px' }}>
            <h2 style={{ color: '#446fb6' }}>¿Cómo funciona la aplicación?</h2>
            <p>La aplicación comienza con el botón "Empezar". Luego, realiza preguntas por medio de audio de voz sobre nombre, edad, peso, etc. Al finalizar, proporcionará un plan nutricional personalizado.</p>
          </section>
    
          <section style={{ marginBottom: '20px' }}>
            <h2 style={{ color: '#446fb6' }}>¿Cómo puedo comenzar a usar la aplicación?</h2>
            <p>Haz clic en el botón "Empezar" y responde las preguntas que la aplicación te realizará. Sigue las instrucciones de voz para proporcionar la información necesaria.</p>
          </section>
    
          <section style={{ marginBottom: '20px' }}>
            <h2 style={{ color: '#446fb6' }}>¿Cuánto tiempo tarda en recibir el plan nutricional?</h2>
            <p>El tiempo de procesamiento puede variar, pero normalmente recibirás tu plan nutricional personalizado al finalizar el cuestionario.</p>
          </section>
    
          {/* Agrega más secciones según sea necesario */}
        </div>
      );
};

export default FAQPage;