import React from 'react';
import './styles.scss';
import logo from '../../assets/fondoNP.png'

const FAQPage = () => {
    return (
        <div className='all_content' >
          <h1 >Preguntas Frecuentes</h1>
    <hr />
          <section >
            <h2 className='title'>¿Cómo funciona la aplicación?</h2>
            <p>La aplicación inicia ingresando tu email y presionando el botón "Empezar". Puedes elegir la voz de la AI con la que vas a interactuar. Desde allí, toda comunicaciónserá a través de comandos de voz, te hará preguntas sobre tu nombre, edad, peso, etc. Al completar el cuestionario, recibirás un plan nutricional personalizado vía email.</p>
          </section>
    
          <section>
            <h2 className='title'>¿Cómo puedo comenzar a usar la aplicación?</h2>
            <p>Haz clic en "Empezar" y responde las preguntas que la aplicación te hará. Sigue las instrucciones de voz para proporcionar la información necesaria. Asegúrate de ingresar tu correo electrónico, ya que es crucial para recibir tu plan nutricional.</p>
          </section>
    
          <section >
            <h2 className='title'>¿Cuánto tiempo tarda en recibir el plan nutricional?</h2>
            <p>El tiempo de procesamiento puede variar, pero generalmente recibirás tu plan nutricional personalizado al finalizar el cuestionario. Recuerda que debes proporcionar un correo electrónico válido para recibir tu plan.</p>
          </section>
    
          <section >
            <h2 className='title'> ¿Qué hago si la AI no comprende mi respuesta o comete un error?</h2>
            <p>Si la AI no entiende alguna de tus respuestas, puedes repetirla o indicarle claramente cuál es el dato que tomó incorrectamente. La comunicación es clave para asegurarnos de obtener la información correcta.</p>
          </section>
          <h2>¡Esperamos que disfrutes utilizando NutriPlan! Si tienes más preguntas, no dudes en contactarnos.</h2>
          
          <img src={logo} className='imagenLogo' alt="logo" />
        </div>
      );
};

export default FAQPage;