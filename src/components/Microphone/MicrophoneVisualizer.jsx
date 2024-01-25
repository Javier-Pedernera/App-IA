import React, { useState, useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import microfono from '../../assets/mic.png';
import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js';
import RecordPlugin from 'https://unpkg.com/wavesurfer.js@7/dist/plugins/record.esm.js';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Transcription from '../Transcription';
import './styles.css';
import { pipeline } from '@xenova/transformers';
// import wavefile from 'wavefile';
import fs from 'fs';
import axios from 'axios';

const MicrophoneVisualizer = () => {
  const {
    transcript,
    finalTranscript,
    listening,
    startListening,
    stopListening,
    resetTranscript,
    isMicrophoneAvailable
  } = useSpeechRecognition();
const OpenAIKey = import.meta.env.VITE_OPENAI_API_KEY
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorder = useRef(null);
  const [stream, setStream] = useState(null);
  const waveSurferRef = useRef(null);
  const [conversation, setConversation] = useState([]);

  console.log(OpenAIKey);
//logica para pasar texto a audio
const handleSpeech = async () => {
// const synthesizer = await pipeline('text-to-speech', 'Xenova/speecht5_tts', { quantized: false });
// console.log(synthesizer);
// // model_id = "ylacombe/mms-spa-finetuned-argentinian-monospeaker"
// // const synthesizer = pipeline("text-to-speech", model_id)
// const EMBED = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin';
// const PHRASE = 'Hello, my dog is cute'
// const out = await synthesizer(PHRASE, { speaker_embeddings:EMBED });
// console.log(out)
// const wav = new wavefile.WaveFile();
// wav.fromScratch(1, out.sampling_rate, '32f', out.audio);
// fs.writeFileSync('out.wav', wav.toBuffer());



const response = await axios.post(
  'https://api.openai.com/v1/audio/speech',
  {
    'model': 'tts-1',
    'input': 'Hola',
    'voice': 'alloy'
  },
  {
    headers: {
      'Authorization': 'Bearer ' + OpenAIKey,
      'Content-Type': 'application/json'
    }
  }
);

console.log(response);

}

  // console.log(listening);
  // const createWaveSurfer = () => {
  //   if (waveSurferRef.current) {
  //     waveSurferRef.current.destroy();
  //   }

  //   waveSurferRef.current = WaveSurfer.create({
  //     container: '#waveform',
  //     waveColor: 'rgb(200, 0, 200)',
  //     progressColor: 'rgb(100, 0, 100)',
  //   });

  //   waveSurferRef.current.registerPlugin(RecordPlugin.create({ renderRecordedAudio: false }));

  //   waveSurferRef.current.on('record-end', (blob) => {
  //     const container = document.querySelector('#recordings');
  //     const recordedUrl = URL.createObjectURL(blob);

  //     const newWaveSurfer = WaveSurfer.create({
  //       container,
  //       waveColor: 'rgb(200, 100, 0)',
  //       progressColor: 'rgb(100, 50, 0)',
  //       url: recordedUrl,
  //     });

  //     const playButton = container.appendChild(document.createElement('button'));
  //     playButton.textContent = 'Play';
  //     playButton.onclick = () => newWaveSurfer.playPause();
  //     newWaveSurfer.on('pause', () => (playButton.textContent = 'Play'));
  //     newWaveSurfer.on('play', () => (playButton.textContent = 'Pause'));

  //     const downloadLink = container.appendChild(document.createElement('a'));
  //     Object.assign(downloadLink, {
  //       href: recordedUrl,
  //       download: 'recording.' + blob.type.split(';')[0].split('/')[1] || 'webm',
  //       textContent: 'Download recording',
  //     });
  //   });
  // };
console.log(conversation);
  // useEffect(() => {
  //   createWaveSurfer();

  //   return () => {
  //     if (waveSurferRef.current) {
  //       waveSurferRef.current.destroy();
  //     }
  //   };
  // }, []);

  useEffect(() => {
    if (finalTranscript !== '') {
      setConversation((prevConversation) => [
        ...prevConversation,
        { type: 'user', content: finalTranscript, timestamp: new Date() },
      ]);
    }
   
  }, [finalTranscript]);

  

  useEffect(() => {
    if (stream) {
      SpeechRecognition.startListening({ continuous: false });

    } else {
      SpeechRecognition.stopListening();
      //agrego el mensaje a la conversacion

    }
  }, [stream]);

  const handleStart = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        setStream(stream);
        const recorder = new MediaRecorder(stream);
        const chunks = [];

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: 'audio/wav' });
          setAudioBlob(audioBlob);
          setRecording(false);
          

        };

        mediaRecorder.current = recorder;
        recorder.start();
        setRecording(true);
      })
      .catch((error) => {
        console.error('Error al obtener el stream de audio:', error);
      });
  };

  const handleStop = () => {
    setStream(null);
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
    }
  };

  const handleReset = () => {
    resetTranscript();
    setConversation([])
    setAudioBlob(null);
  };

  return (
    <div style={{ width: '100%', height: '100%', display:'flex'
     }}>
        <div className='contenedor'>
        <div 
        style={{ width: '100%',
         height: '100%',
          display:'flex',
          alignItems:"center"
           }}>
          <div style={{
            display:"flex", 
            width:"100%",
      flexDirection: 'column', 
      alignItems:"center"}} >
            
            <p>Listening: {listening ? 'Yes' : 'No'}</p>

            {/* {recording && stream && <div style={{ width: '100%', height: '200px' }} id="waveform"></div>} */}
            
            <Button
              variant="primary"
              style={{
                display: "flex",
                justifyContent: "center",
                width: '150px',
                height: '150px',
                margin: '10px',
                borderRadius: '50%',
                opacity: "90%"
              }}
              onClick={handleStart}
              disabled={listening}
            >
              {/* Start Listening */}
              <img src={microfono} alt="Micrófono" style={{ width: 'auto', height: '100%' }} />
            </Button>

            {/* solo aparaece cuando esta grabando para detener la grabacion */}
            {listening ?
            <Button
            style={{ 
              width: '40%', 
              height: 'auto', 
              margin:"10px",
              borderRadius: '5px', // Hace que el botón sea redondo
                overflow: 'hidden',
              }} variant="danger" onClick={handleStop} disabled={!listening}>
              Stop Listening
            </Button>: <div></div>}
            
            <Button
            style={{ 
              width: '40%', 
              height: 'auto', 
              margin:"10px",
              borderRadius: '5px', // Hace que el botón sea redondo
                // overflow: 'hidden',
              }} variant="warning" onClick={handleReset}>
              Reset Transcription
            </Button>
            
            {/* <div id="waveform"></div> */}
            
            {audioBlob && (
              <div>
                <audio controls src={URL.createObjectURL(audioBlob)} />
                <a href={URL.createObjectURL(audioBlob)} download="recorded_audio.wav">
                  Download Audio
                </a>
              </div>
            )}



            <div id="recordings" style={{ margin: '1rem 0' }}></div>
          </div>
          
        </div>
        <div style={{ width: '100%', height: '100%', display:'flex'
     }}>
        {/* <p>Transcription: {transcript}</p> */}

         <Transcription  textoTranscripcion={conversation}/>
        </div>
             <Button
              variant="success"
              style={{
                display: "flex",
                justifyContent: "center",
                width: '50px',
                height: '50px',
                margin: '10px',
                borderRadius: '5px',
                opacity: "90%"
              }}
              onClick={handleSpeech}
              // disabled={listening}
            >
              Play
            </Button>
      </div>
    </div>
  );
};

export default MicrophoneVisualizer;
