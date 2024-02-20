import React, { useEffect, useRef } from 'react';
import SiriWave from 'siriwave';

const AudioVisualizer = ({ audioUrl }) => {
  const siriWaveRef = useRef(null);

  useEffect(() => {
    const siriWave = new SiriWave({
      container: siriWaveRef.current,
      autostart: true,
      style: 'ios',
      speed: 0.1,
      amplitude: 0.5,
      frequency: 2,
    });

    const audio = new Audio(audioUrl);

    const handleAudioEnded = () => {
      siriWave.stop();
    };

    audio.addEventListener('ended', handleAudioEnded);

    audio.play();
    siriWave.start();

    return () => {
      audio.removeEventListener('ended', handleAudioEnded);
      siriWave.stop();
    };
  }, [audioUrl]);

  return <div ref={siriWaveRef} style={{ width: '100%', height: '200px' }} />;
};

export default AudioVisualizer;