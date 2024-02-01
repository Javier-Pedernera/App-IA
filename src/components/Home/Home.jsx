import React, { useState, useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { BarVisualizer } from 'react-mic-visualizer';
import MicrophoneVisualizer from '../Microphone/MicrophoneVisualizer';
import { useDispatch, useSelector } from 'react-redux';
import { textToSpeech } from '../../utils/TTS';
import { addMessage } from '../../Redux/Actions/MessageGet';

export default function Home() {
  const [audioPlayed, setAudioPlayed] = useState(false);
  const User = useSelector((state) => state.user.userData);
  const welcome = useSelector((state) => state.messages.messages);
  const selectedVoice = useSelector((state) => state.messages.selectedVoice);


  return (
    <MicrophoneVisualizer />
  );
}

