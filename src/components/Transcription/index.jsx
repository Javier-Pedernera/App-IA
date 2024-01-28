import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup } from 'react-bootstrap';
import './styles.css';

const Transcription = ({ textoTranscripcion }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Hacer scroll hacia abajo cada vez que se actualice el contenido
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [textoTranscripcion]);

  return (
    <div
      className='allcontent'
      ref={containerRef}
    >
      {/* <h2>Transcripción:</h2> */}
      {/* <ListGroup > */}
        {textoTranscripcion.map((mensaje, index) => (
          <ListGroup as="ul"
            key={index}
            style={{ marginTop: "5px"}}
            // active={mensaje.type === 'user' ? 'false' : 'true'}
            className={mensaje.type}
          >
            <div className={`globo${mensaje.type.length}`} as="li">{mensaje.content}</div> 
            {/* <ListGroup.Item as="li" active>{mensaje.content}</ListGroup.Item> */}
            
          </ListGroup>
        ))}
      {/* </ListGroup> */}
    </div>
  );
};

export default Transcription;
