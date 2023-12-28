import React, { useState, useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import microfono from '../../assets/mic.png';
import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js';
import RecordPlugin from 'https://unpkg.com/wavesurfer.js@7/dist/plugins/record.esm.js';
import { Button, Container, Row, Col, Form } from 'react-bootstrap'; // Import React Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';
import Transcription from '../Transcription/Transcription';


const MicrophoneVisualizer = () => {
  const {
    transcript,
    listening,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorder = useRef(null);
  const [stream, setStream] = useState(null);
  const waveSurferRef = useRef(null);

  const createWaveSurfer = () => {
    if (waveSurferRef.current) {
      waveSurferRef.current.destroy();
    }

    waveSurferRef.current = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'rgb(200, 0, 200)',
      progressColor: 'rgb(100, 0, 100)',
    });

    waveSurferRef.current.registerPlugin(RecordPlugin.create({ renderRecordedAudio: false }));

    waveSurferRef.current.on('record-end', (blob) => {
      const container = document.querySelector('#recordings');
      const recordedUrl = URL.createObjectURL(blob);

      const newWaveSurfer = WaveSurfer.create({
        container,
        waveColor: 'rgb(200, 100, 0)',
        progressColor: 'rgb(100, 50, 0)',
        url: recordedUrl,
      });

      const playButton = container.appendChild(document.createElement('button'));
      playButton.textContent = 'Play';
      playButton.onclick = () => newWaveSurfer.playPause();
      newWaveSurfer.on('pause', () => (playButton.textContent = 'Play'));
      newWaveSurfer.on('play', () => (playButton.textContent = 'Pause'));

      const downloadLink = container.appendChild(document.createElement('a'));
      Object.assign(downloadLink, {
        href: recordedUrl,
        download: 'recording.' + blob.type.split(';')[0].split('/')[1] || 'webm',
        textContent: 'Download recording',
      });
    });
  };

  useEffect(() => {
    createWaveSurfer();

    return () => {
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (stream) {
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
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
    setAudioBlob(null);
  };

  return (
    <Container>
      <Row>
        <Col>
          <div>
            <h1>Home Page</h1>
            
            <p>Listening: {listening ? 'Yes' : 'No'}</p>

            {recording && stream && <div style={{ width: '100%', height: '200px' }} id="waveform"></div>}
            
            <Button variant="primary" onClick={handleStart} disabled={listening}>
              Start Listening
              <img src={microfono} alt="Micrófono" style={{ width: '10%', height: 'auto' }} />
            </Button>
            
            <Button variant="danger" onClick={handleStop} disabled={!listening}>
              Stop Listening
            </Button>
            
            <Button variant="warning" onClick={handleReset}>
              Reset Transcription
            </Button>
            
            <div id="waveform"></div>
            
            {audioBlob && (
              <div>
                <audio controls src={URL.createObjectURL(audioBlob)} />
                <a href={URL.createObjectURL(audioBlob)} download="recorded_audio.wav">
                  Download Audio
                </a>
              </div>
            )}
            
            <div id="recordings" style={{ margin: '1rem 0' }}></div>
          </div><Transcription textoTranscripcion={transcript}/>
        </Col>
        <Col>
        {/* <p>Transcription: {transcript}</p> */}

         
        </Col>
      </Row>
    </Container>
  );
};

export default MicrophoneVisualizer;
