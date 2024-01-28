import React, { useState, useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import microfono from '../../assets/mic.png';
import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js';
import RecordPlugin from 'https://unpkg.com/wavesurfer.js@7/dist/plugins/record.esm.js';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Transcription from '../Transcription';
import './styles.css';
// import wavefile from 'wavefile';
import { textToSpeech } from '../../utils/TTS';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, responseUser } from '../../Redux/Actions/MessageGet';
import { addMessageToLocalStorage, getMessagesFromLocalStorage } from '../../utils/localStorage';

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
  const actualUser = useSelector((state) => state.user.userData);
  const selectedVoice = useSelector((state) => state.messages.selectedVoice);
  const messages = useSelector((state) => state.messages.messages);
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorder = useRef(null);
  const [stream, setStream] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [endPlan, setEndPlan] = useState(false);
  const dispatch = useDispatch();

  console.log("conversacion", conversation);
  console.log("mensajes en el global:", messages);
  if(messages.length){console.log("messages.length-1.type",messages[messages.length - 1].type);}
  console.log("Usuario actual en el global", actualUser);
  console.log("AudioPlayed", audioPlayed);
  console.log("finalTranscript:", finalTranscript);
  console.log("recording:", recording);
  console.log("lstening:", listening);

  const handleSpeech = async () => {
    console.log("handleSpeech funcionando");
    //   try {
    //     if (messages.length && !audioPlayed && selectedVoice && messages[messages.length-1].type=='NP AI') {
    //  const lastMessage=conversation[messages.length-1].content
    //       const response = await textToSpeech(lastMessage, selectedVoice);
    // console.log(response);
    //       const url = window.URL.createObjectURL(new Blob([response.data]));
    //       // console.log(url);
    //       const audio = new Audio(url);
    //       audio.play();
    //       // console.log(messages[messages.length-1].type);
    //       await audio.addEventListener('ended', () => {
    // setTimeout(() => {
    setAudioPlayed(false)
    setRecording(true)
    // }, 2000);

    //       });

    //     } else {
    //       console.log("No hay acutal user o voz seleccionada");
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
  }

  useEffect(() => {
    if(!messages || !messages.length){
      compareMessages(messages)
    }
    if(messages[messages.length - 1].message === "Gracias por contestar las preguntas. Su plan nutricicional le llegará por e-mail"){
      console.log("terminó la conversación");
            handleStop() }
    console.log(messages.length && actualUser && actualUser.message && !audioPlayed && messages[messages.length - 1].type == 'NP AI' && !endPlan);
    if (messages.length && actualUser && actualUser.message && !audioPlayed && messages[messages.length - 1].type == 'NP AI' && !recording &&!endPlan) {

      setAudioPlayed(true)
      console.log("if !audioPlayed ");
      handleSpeech()
    }
    if (recording) {
      recordingStart()
    }
    if (messages[messages.length - 1].type == 'NP AI' && !endPlan) { SpeechRecognition.startListening({ continuous: false });}
    
  }, [recording,audioPlayed, listening ]);

useEffect(() => {
    if (messages[messages.length - 1].type == 'NP AI' && !endPlan) { 
      handleSpeech()
      recordingStart() }
  }, [messages]);

  const recordingStart = () => {
    SpeechRecognition.startListening({ continuous: false });

  }

  useEffect(() => {
    if (finalTranscript !== '' && finalTranscript !== true && !endPlan) {
      // SpeechRecognition.stopListening();
      console.log(typeof (finalTranscript));
      const userResponse = {
        token: actualUser.tokenUser,
        respuesta: finalTranscript
      }
      const messageUser = { type: 'user', content: finalTranscript, timestamp: new Date().toString() }
      console.log("data de la transcripcion", userResponse);
      setConversation((prevConversation) => [
        ...prevConversation,
        messageUser,
      ]);
      dispatch(addMessage(messageUser))
      dispatch(responseUser(userResponse))
      setRecording(false)
      resetTranscript()
    }
    if (listening == false && recording == true && !endPlan) { SpeechRecognition.startListening({ continuous: false }); }

  }, [finalTranscript]);


  const handleReset = () => {
    resetTranscript();
    setConversation([]);
    setAudioBlob(null);
    setAudioPlayed(false);
  };
  const handleStop = () => {
    setRecording(false);
    SpeechRecognition.stopListening();
    setEndPlan(true)
  };

  return (
    <div style={{
      width: '100%', height: '90%', display: 'flex'
    }}>
      <div className='contenedor'>
        <div
          style={{
            width: '40%',
            height: '100%',
            display: 'flex',
            alignItems: "center"
          }}>
          <div style={{
            display: "flex",
            width: "100%",
            flexDirection: 'column',
            alignItems: "center"
          }} >

            <p>Listening: {listening ? 'Yes' : 'No'}</p>
            {/* {recording && stream && <div style={{ width: '100%', height: '200px' }} id="waveform"></div>} */}
            {/* <Button
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
            > */}
            {/* Start Listening */}
            <img src={microfono} alt="Micrófono" style={{ width: 'auto', height: '100px' }} />
            {/* </Button> */}
            {/* solo aparaece cuando esta grabando para detener la grabacion */}
            {listening ?
              <Button
                style={{
                  width: '40%',
                  height: 'auto',
                  margin: "10px",
                  borderRadius: '5px', // Hace que el botón sea redondo
                  overflow: 'hidden',
                }} variant="danger" onClick={handleStop} disabled={!listening}>
                Stop Listening
              </Button> : <div></div>}
            <Button
              style={{
                width: '40%',
                height: 'auto',
                margin: "10px",
                borderRadius: '5px', // Hace que el botón sea redondo
                // overflow: 'hidden',
              }} variant="warning" onClick={handleReset}>
              Reset Transcription
            </Button>
            {/* {audioBlob && (
              <div>
                <audio controls src={URL.createObjectURL(audioBlob)} />
                <a href={URL.createObjectURL(audioBlob)} download="recorded_audio.wav">
                  Download Audio
                </a>
              </div>
            )} */}
            <div id="recordings" style={{ margin: '1rem 0' }}></div>
          </div>

        </div>
        <div style={{
          width: '60%', height: '100%', display: 'flex'
        }}>
          {/* <p>Transcription: {transcript}</p> */}

          <Transcription textoTranscripcion={messages} />
        </div>
      </div>
    </div>
  );
};

export default MicrophoneVisualizer;
