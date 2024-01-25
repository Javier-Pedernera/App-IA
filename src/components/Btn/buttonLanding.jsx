import React, { useState } from 'react';
import './buttonLanding.css';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from '../../Redux/Actions/UserSlice';
//Cuando da al boton comenzar debemos guardar el thread_id



export default function ButtonLanding() {
  const [isAnimating, setAnimating] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async () => {
    setAnimating(true);

    try {
      // dispatch(getUser());
      // const body= {
      //   usuario_id: "Javier1981",
      //     }
      // const response = await fetch('https://desolate-cliffs-71612-40d6bcd1294f.herokuapp.com/plan',body);  // Reemplaza con tu endpoint real
      // const data = await response.json();

      // console.log("soy la data",data);
// const user = {
//   threadId : data.thread_id,
//   message : data.message,
//   tokenUser : data.token
// }
      
      
      

      const threadId = "mono234";
      // Calcula la fecha de expiración en dos horas desde ahora
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + (2 * 60 * 60 * 1000));  // 2 horas en milisegundos
  
      // Almacena el thread_id en las cookies con una expiración de dos horas
      Cookies.set('thread_id', threadId, { expires: expirationDate });

      setTimeout(() => {
        setAnimating(false);

        const storedThreadId = Cookies.get('thread_id');

        navigate(`/home/${storedThreadId}`);
      }, 1750);
    } catch (error) {
      console.error('Error al obtener el thread_id:', error);
    }
  }

  return (
    <button className={`btn ${isAnimating ? 'is-animating' : ''}`} onClick={handleClick}>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="text">Empezar</span>
    </button>
  );
}
