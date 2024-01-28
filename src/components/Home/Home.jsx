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
  // const [welcome, setWelcome] = useState();
  // const dispatch = useDispatch()
  // console.log("en Home welcome",welcome.length);
  // console.log("en Home user",User.message);
  // useEffect(() => {
  //   if(User.message && !welcome.length){
  //     const message = { type: 'NP AI', content: User.message, timestamp: new Date() }
  //   // dispatch(addMessage(message))
  //   }
  // }, [dispatch]);

  return (
<MicrophoneVisualizer/>
  );
}

