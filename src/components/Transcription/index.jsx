import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup } from 'react-bootstrap';
import './styles.css';
import image_NP from "../../assets/icono (1).png"
import image_User from "../../assets/user.png"
import loadingText from "../../assets/user.png"


const Transcription = ({ textoTranscripcion, loader }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Hacer scroll hacia abajo cada vez que se actualice el contenido
    if (containerRef.current.scrollHeight) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [textoTranscripcion]);
  // console.log("loader",loader);

  return (
    <div
      className='allcontent'
      ref={containerRef}
    >
      {textoTranscripcion?.map((mensaje, index) => (
        <ListGroup as="ul" key={index} style={{ marginTop: "10px" }} className={mensaje.type}>

          {index === textoTranscripcion.length - 1 ? (
            <div className={`${mensaje.type}lastMsg`} style={{ display: "flex", alignItems: "flex-end" }}>
              {mensaje.type === "user" ? (
                <img src={image_User} alt={mensaje.type} className='image_NPlan' />
              ) : (
                <img src={image_NP} alt="NutriPlan" className='image_NPlan' />
              )}
              {loader ? (
                <div className="loader"> </div>
              ) : (
                <div className={`globo${mensaje?.type?.length}`} as="li">
                  {mensaje.content}
                </div>
              )}
            </div>
          ) : (
            <div className={mensaje.type}>
              {mensaje.type === "user" ? (
                <img src={image_User} alt={mensaje.type} className='image_NPlan' />
              ) : (
                <img src={image_NP} alt="NutriPlan" className='image_NPlan' />
              )}<div className={`globo${mensaje.type.length}`} as="li">
                {mensaje.content}
              </div>
            </div>
          )}
        </ListGroup>
      ))}
    </div>
  );
};

export default Transcription;
