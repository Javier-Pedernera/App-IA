import React, { useState, useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { BarVisualizer } from 'react-mic-visualizer';
import MicrophoneVisualizer from '../Microphone/MicrophoneVisualizer';
import { useSelector } from 'react-redux';

export default function Home() {
  
  const User = useSelector((state) => state.userData);

console.log(User);


  return (
<MicrophoneVisualizer/>
  );
}

