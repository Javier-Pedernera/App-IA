import React, { useState, useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Transcription from '../Transcription';
import './styles.css';
import { textToSpeech } from '../../utils/TTS';
import { useDispatch, useSelector } from 'react-redux';
import { Out, addMessage, compareMessages, responseUser } from '../../Redux/Actions/MessageGet';
import hablaUser from '../../assets/humanspeaking.gif';
import hablaAI from '../../assets/AIspeaking.gif';
import Complete from '../../assets/Complete.gif';
import { useNavigate } from 'react-router-dom';
import { AudioVisualizer } from 'react-audio-visualize';
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

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
  const navigate = useNavigate();
  const actualUser = useSelector((state) => state.user.userData);
  const selectedVoice = useSelector((state) => state.messages.selectedVoice);
  const messages = useSelector((state) => state.messages.messages);
  const [recording, setRecording] = useState(false);
  const [loadinMsg, setLoadingMsg] = useState(false);
  const [endPlan, setEndPlan] = useState(false);
  const dispatch = useDispatch();
  const lastProcessedMessage = useRef(null);
  const [transcriptText, settranscriptText] = useState(true);

  console.log("listening.length", listening.length);
  console.log("listening", listening);
  console.log("recording", recording);
  console.log("messages", messages);
  console.log("finaltranscript", finalTranscript);
  console.log("loadingMsgAI", loadinMsg);

  useEffect(() => {
    if (finalTranscript !== '' && finalTranscript !== true) {
      SpeechRecognition.stopListening();
      setLoadingMsg(true)
      const userResponse = {
        token: actualUser.tokenUser,
        respuesta: finalTranscript
      }
      const messageUser = { type: 'user', content: finalTranscript, timestamp: new Date().toString() }
      console.log("data de la transcripcion", userResponse);
      dispatch(addMessage(messageUser))
      dispatch(responseUser(userResponse))
      setRecording(false)
      resetTranscript()
      setLoadingMsg(false)
    }
  }, [finalTranscript]);

  useEffect(() => {
    if (messages.length && messages[messages.length - 1].content === "Gracias por contestar las preguntas. Su plan nutricicional le llegará por e-mail") {
      console.log("entro a handlestop");
      handleStop()
    }
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return null
    }
    if (listening == false && recording == true && !endPlan) {
      SpeechRecognition.startListening({
        continuous: true,
        interimResults: true,
        maxAlternatives: 3,
        silenceThreshold: 20.0,
        // Aumenta la sensibilidad de cuando el usuario habla
        vad: "aggressive"
      })
      console.log("speechRecognitio if", SpeechRecognition);
      // SpeechRecognition.startListening({ continuous: false, language: "es-AR" }); 
    }
  }, [recording]);

  useEffect(() => {
    // verifica que esten los datos en localStorage
    if (!messages || !messages.length) {
      dispatch(compareMessages())
    }
    if (messages.length && messages[messages.length - 1].type === 'NP_AI' && !endPlan && messages.length == 1) {
      const latestMessage = messages[messages.length - 1].content;
      if (latestMessage !== lastProcessedMessage.current) {
        console.log("se envia handleSpeech 1");
        setLoadingMsg(true)
        handleSpeech();
        lastProcessedMessage.current = latestMessage;
      }
    }
    if (messages.length && messages[messages.length - 1].type == 'NP_AI' && !endPlan && messages.length > 2) {
      console.log("se envia handleSpeech 2");
      setLoadingMsg(true)
      handleSpeech()
    }
  }, [messages]);

  const handleReset = () => {
    console.log("en reset");
    localStorage.removeItem("storedMessages");
    stopListening()
    dispatch(getOut())
    dispatch(getUser({}))
    navigate(`/landing`);
  };
  const handleStop = () => {
    setRecording(false);
    SpeechRecognition.stopListening();
    setEndPlan(true)
  };
  // Funcion para pasar de texto a voz con OpenAI
  const handleSpeech = async function () {
    const lastMessage = messages.length ? messages[messages.length - 1].content : "no se envio el ultimo mensaje"
    try {
      setLoadingMsg(true)
      const response = await textToSpeech(lastMessage, selectedVoice.length ? selectedVoice : "nova");
      if (response) {
        setLoadingMsg(false);
        const url = window.URL.createObjectURL(new Blob([response.data]));

        const audio = new Audio(url);
        await new Promise((resolve) => {
          audio.addEventListener('ended', () => {
            resolve();
          });
          audio.play();
        });
        setRecording(true);

      }
    } catch (error) {
      console.error("Error en handleSpeech:", error);
      setLoadingMsg(false);
    }
  }
  const handleTranscripText = () => {
    settranscriptText(!transcriptText)
  };

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
                  <img src={hablaUser} alt="Usuario hablando" style={{ maxWidth: '300px', width: '40%', height: '40%' }} /> :
                  <img src={hablaAI} alt="AI hablando" style={{ maxWidth: '300px', width: '40%', height: '40%' }} />)
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
              Leave and reset conversation
            </Button>

            <div id="recordings" style={{ margin: '1rem 0' }}></div>
          </div>

        </div>
        {transcriptText ?
          <div className='content_transcrip'>
            <div className='btn_transcript' onClick={handleTranscripText}>
              <RiArrowRightSLine className='arrow' />
            </div>
            <Transcription textoTranscripcion={messages} loader={loadinMsg} />
          </div> : <div className='btn_transcript' onClick={handleTranscripText}>
            <RiArrowLeftSLine className='arrow' />
          </div>
        }
      </div>
    </div>
  );
};

export default MicrophoneVisualizer;
