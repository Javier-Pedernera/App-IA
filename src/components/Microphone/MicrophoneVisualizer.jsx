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
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js'
import { getOut } from '../../Redux/Actions/MessageSlice';
import { getUser } from '../../Redux/Actions/UserSlice';
import Cookies from 'js-cookie';

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
  const [loadingMsg, setLoadingMsg] = useState(false);
  const [endPlan, setEndPlan] = useState(false);
  const dispatch = useDispatch();
  const lastProcessedMessage = useRef(null);
  const [transcriptText, settranscriptText] = useState(true);
  const wavesurferRef = useRef(null);
  const [wavesurfer, setWaveSurfer] = useState(null);
  let wavesurferMicRef = useRef(null);

  console.log("listening.length", listening.length);
  console.log("listening", listening);
  console.log("recording", recording);
  console.log("messages", messages);
  console.log("finaltranscript", finalTranscript);
  console.log("loadingMsgAI", loadingMsg);

  useEffect(() => {
    if (wavesurferMicRef.current) {
      wavesurferMicRef.current.destroy();
    }

    if (recording) {
      const wavesurferMic = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#3FB5E4',
        progressColor: '#f1c536b3',
        barRadius: 4,
        responsive: true,
        barWidth: 5,
        barGap: 1.5,
      });

      // Inicializa el plugin del micrófono
      const micPlugin = wavesurferMic.registerPlugin(RecordPlugin.create())

      // Habilita el micrófono
      micPlugin.startRecording();

      // Asigna la referencia actual de wavesurferMic a wavesurferMicRef
      wavesurferMicRef.current = wavesurferMic;

      // Manejo de errores del micrófono
      micPlugin.on('deviceError', function (code) {
        console.warn('Device error: ' + code);
      });
    }
  }, [recording, finalTranscript]);

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
    SpeechRecognition.stopListening();
    console.log("en reset");
    Cookies.remove('user');
    Cookies.remove('userEmail');
    localStorage.removeItem('storedMessages');
    localStorage.removeItem("storedMessages");
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
        const url = await window.URL.createObjectURL(new Blob([response.data]));
        console.log(url);

        if (wavesurferRef.current) {
          // Si ya existe una instancia de Wavesurfer, la destruye antes de crear una nueva
          wavesurferRef.current.destroy();
        }
        const wavesurfer = WaveSurfer.create({
          container: '#waveform',
          waveColor: '#5ce1e6',
          progressColor: '#3FB5E4',
          autoScroll: true,
          barRadius: 4,
          cursorColor: '#f1c536b3',
          cursorWidth: 2,
          responsive: true,
          barWidth: 5,
          barGap: 1.5,
          autoplay: true,
          hideScrollbar: true,
          height: 100
        });
        wavesurferRef.current = wavesurfer;
        await wavesurfer.load(url);
        // // wavesurfer.on('interaction', () => {
        // //   console.log("reproducir");
        // //   wavesurfer.play();
        // // });
        // // Esperar a que termine el audio
        wavesurfer.on('finish', () => {
          wavesurfer.destroy();
          console.log("Audio terminado de reproducir");
          setRecording(true);
        });
        wavesurfer.on('pause', function () {
          wavesurfer.params.container.style.opacity = 0.9;
        });
        wavesurfer.on('error', (err) => {
          console.error("Error en Wavesurfer:", err);
        });

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
            <div className='waveStyle'>
               <div id="waveform">{loadingMsg ? <div className='loadercontainer'> <div className="loaderAudio"> </div></div>:null}</div> 
            </div>

            {/* {listening ?
              <Button
                style={{
                  width: '40%',
                  height: 'auto',
                  margin: "10px",
                  borderRadius: '5px',
                  overflow: 'hidden',
                }} variant="danger" onClick={handleStop} disabled={!listening}>
                Stop Listening
              </Button> : <div></div>} */}
            <Button className='btnReset'
              variant="warning" onClick={handleReset}>
              Abandonar conversación
            </Button>

            <div id="recordings" style={{ margin: '1rem 0' }}></div>
          </div>

        </div>
        {transcriptText ?
          <div className='content_transcrip'>
            <div className='btn_transcript' onClick={handleTranscripText}>
              <RiArrowRightSLine className='arrow' />
            </div>
            <Transcription textoTranscripcion={messages} loader={loadingMsg} />
          </div> : <div className='btn_transcript' onClick={handleTranscripText}>
            <RiArrowLeftSLine className='arrow' />
          </div>
        }
      </div>
    </div>
  );
};

export default MicrophoneVisualizer;
