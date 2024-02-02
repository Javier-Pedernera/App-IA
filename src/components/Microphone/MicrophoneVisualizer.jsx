import React, { useState, useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Transcription from '../Transcription';
import './styles.css';
import { textToSpeech } from '../../utils/TTS';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, compareMessages, responseUser } from '../../Redux/Actions/MessageGet';
import microfono from '../../assets/mic.png';
import hablaUser from '../../assets/humanspeaking.gif';
import hablaAI from '../../assets/AIspeaking.gif';
import Complete from '../../assets/Complete.gif';
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
  const [loadinMsg, setLoadingMsg] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [endPlan, setEndPlan] = useState(false);
  const dispatch = useDispatch();
  const isMounted = useRef(true);

  useEffect(() => {

    if (messages.length && messages[messages.length - 1].content === "Gracias por contestar las preguntas. Su plan nutricicional le llegará por e-mail") {
      handleStop()
    }
    //activa la funcion de grabar 
    if (recording) {
      
      SpeechRecognition.startListening({ continuous: false, language: "es-AR" });

    }
  }, [recording, listening]);

  useEffect(() => {
    if (finalTranscript !== '' && finalTranscript !== true && !endPlan) {
      setLoadingMsg(true)
      const userResponse = {
        token: actualUser.tokenUser,
        respuesta: finalTranscript
      }
      const messageUser = { type: 'user', content: finalTranscript, timestamp: new Date().toString() }
      // console.log("data de la transcripcion", userResponse);
      setConversation((prevConversation) => [
        ...prevConversation,
        messageUser,
      ]);
      dispatch(addMessage(messageUser))
      dispatch(responseUser(userResponse))
      setRecording(false)
      SpeechRecognition.stopListening();
      resetTranscript()
      setLoadingMsg(false)
    }
    if (listening == false && recording == true && !endPlan) { SpeechRecognition.startListening({ continuous: false, language: "es-AR" }); }

  }, [finalTranscript]);

  useEffect(() => {

    // verifica que esten los datos en localStorage
    if (!messages || !messages.length) {
      dispatch(compareMessages())
    }
    
    
    //si el ultimo msj es de IA que lo lea    
    if (messages.length && messages[messages.length - 1].type == 'NP_AI' && !endPlan) {
      // console.log("se envia handleSpeech");
      handleSpeech()
    }
    
    //Pasa a audio cuando el ultimo msj del array es de la IA
    if (isMounted.current) {
      isMounted.current = false;
      return;
    }
  }, [messages]);

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
  // Funcion para pasar de texto a voz con OpenAI
  const handleSpeech = async function ()  {
    const lastMessage = messages.length ? messages[messages.length - 1].content : "no se envio el ultimo mensaje"
    try {
      setLoadingMsg(true)
      const response = await textToSpeech(lastMessage, selectedVoice.length ? selectedVoice : "alloy");
      if (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const audio = new Audio(url);
        await new Promise((resolve) => {
          audio.addEventListener('ended', () => {
            resolve(); // Resuelve la promesa cuando se completa la reproducción del audio
          });
          audio.play();
        });
        setAudioPlayed(false);
        setRecording(true);
        setLoadingMsg(false);
      }
    } catch (error) {
      console.error("Error en handleSpeech:", error);
      setLoadingMsg(false);
    }
  }


  return (
    <div style={{
      width: '100%', height: '90%', display: 'flex'
    }}>
      <div className='contenedor'>
        <div className='sub_contenedor'>
          <div className='sub_contenedor2'>
            {
              endPlan ? <img src={Complete} alt="Plan Creado" className='BrainImg' /> :
                (listening ?
                  <img src={hablaUser} alt="Usuario hablando" style={{ width: '40%', height: '40%' }} /> :
                  <img src={hablaAI} alt="AI hablando" style={{ width: '40%', height: '40%' }} />)
            }

            {listening ?
              <Button
                style={{
                  width: '40%',
                  height: 'auto',
                  margin: "10px",
                  borderRadius: '5px',
                  overflow: 'hidden',
                }} variant="danger" onClick={handleStop} disabled={!listening}>
                Stop Listening
              </Button> : <div></div>}
            <Button className='btnReset'
              variant="warning" onClick={handleReset}>
              Reset Transcription
            </Button>

            <div id="recordings" style={{ margin: '1rem 0' }}></div>
          </div>

        </div>
        <div style={{
          width: '100%', height: '100%', display: 'flex'
        }}>
          <Transcription textoTranscripcion={messages} loader={loadinMsg} />
        </div>
      </div>
    </div>
  );
};

export default MicrophoneVisualizer;
