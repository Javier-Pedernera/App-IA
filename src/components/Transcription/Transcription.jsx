import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Transcription = ({ textoTranscripcion }) => {
  return (
    <div id="transcripcion" className="border p-3 m-3">
      <h2>Transcripción:</h2>
      <p>{textoTranscripcion}</p>
    </div>
  );
};

export default Transcription;