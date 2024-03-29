import React, { useState } from 'react';
import './buttonLanding.css';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { getUserData } from '../../Redux/Actions/UserGet';
import { addMessage } from '../../Redux/Actions/MessageGet';
import { useTranslation } from "react-i18next";
export default function ButtonLanding({ dataPlan, setLoader, activeButton }) {
  const actualUser = useSelector((state) => state.user.userData);
  const [isAnimating, setAnimating] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const URL = import.meta.env.VITE_API_URL
  // console.log(isAnimating);

  const handleClick = async () => {
    setAnimating(true);
    try {
      //ID del usuario cuando este registrado
      if (!Object.keys(actualUser).length) {
        setLoader(true)
        const response = await axios.post(`${URL}/plan`, dataPlan);
        // const data = {
        //   message: "¡Hola! Para comenzar a elaborar tu plan nutricional, necesitaré hacerte algunas preguntas. Empecemos:\n\n¿Cuál es tu nombre?",
        //   thread_id: "thread_7QffFW7XGFyTc56woWPZqOt6",
        //   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvX2lkIjoiSmF2aWVyMTk4MSIsInRocmVhZF9pZCI6InRocmVhZF83UWZmRlc3WEdGeVRjNTZ3b1dQWnFPdDYiLCJleHAiOjE3MDYzNjI0NzF9.0evkN4aDwxG7B9Dnqc-CiJXYxAG-nVQmfZZIPVWM4cc"
        // }
        // const response = {
        //   data
        // }
        console.log("response en el boton", response);
        const user = {
          threadId: response.data.thread_id,
          message: response.data.message,
          tokenUser: response.data.token,
        }
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + (2 * 60 * 60 * 1000));  // 2 horas en milisegundos

        // Almacena el thread_id en las cookies con una expiración de dos horas
        Cookies.set('user', JSON.stringify(user), { expires: expirationDate });
        Cookies.set('userEmail', dataPlan.usuario_id, { expires: expirationDate });
        setTimeout(() => {
          // mensaje de bienvenida al estado global
          const message = { type: 'NP_AI', content: user.message, timestamp: new Date().toString() }
          dispatch(addMessage(message))
          //cargo el usuario al estado
          dispatch(getUserData(user));
          setLoader(false)
          setAnimating(false);
          navigate(`/home`);
        }, 200);
      } else {
        setAnimating(false);
        navigate(`/home`);
      }
    } catch (error) {
      console.error('Error al obtener el thread_id:', error);
    }
  }

  return (
    <button id='startButton' className={`btn ${isAnimating ? 'is-animating' : ''} ${activeButton ? '' : 'inactive-button'}`} onClick={handleClick} disabled={!activeButton}>
      {activeButton ? (
        <>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </>
      ) : null}
      <span className="text">{t("startButton")}</span>
    </button>
  );
}
