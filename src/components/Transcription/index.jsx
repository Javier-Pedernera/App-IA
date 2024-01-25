import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup } from 'react-bootstrap';
import './styles.css';
const Transcription = ({ textoTranscripcion }) => {
  return (
    <div id="transcripcion" style={{ width: '100%', height: '100%', display:'flex', flexDirection:'column'
  }} className="border p-3 m-3">
      <h2>Transcripción:</h2>
      {textoTranscripcion.map((mensaje, index) => (

<ListGroup>
<ListGroup.Item 
 variant={mensaje.type == 'user' ? 'primary' : 'Light'}
 className={mensaje.type}
 >
  {/* <b>{mensaje.type}</b> */}
  {/* :  */}
  {mensaje.content}
</ListGroup.Item>
</ListGroup>

        // <div key={index} className={mensaje.type === 'user' ? 'user-message' : 'assistant-message'}
        //   >
        //   {mensaje.type}: {mensaje.content}
        // </div>
      ))}
    </div>
  );
};

export default Transcription;