import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import "../main.css";

const PomodoroTimer = ({ workTime, breakTime }) => {
  const [time, setTime] = useState(workTime);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const playSound = () => {
    const audio = new Audio('alarm_sound.mp3');
    audio.play();
  };

  const playSound2 = () => {
    const audio = new Audio('click_sound.mp3');
    audio.play();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const animate = (time) => {
    if (previousTimeRef.current != null) {
      const deltaTime = (time - previousTimeRef.current) / 1000;

      if (isActive) {
        setTime((prevTime) => Math.max(prevTime - deltaTime, 0));
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (time === 0) {
      if (isBreak) {
        setTime(workTime);
        setIsBreak(false);
      } else {
        setTime(breakTime);
        setIsBreak(true);
      }
      playSound();
    }
  }, [time, isBreak, workTime, breakTime]);

  useEffect(() => {
    if (isActive) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isActive]);

  useEffect(() => {
    setTime(workTime);
  }, [workTime]);

  const handleStartPause = () => {
    playSound2();
    setIsActive(!isActive);
  };

  const handleReset = () => {
    playSound2();
    setIsActive(false);
    setTime(workTime);
    setIsBreak(false);
  };

  const handleToggleMode = () => {
    playSound2();
    if (isBreak) {
      setIsBreak(false);
      setTime(workTime);
    } else {
      setIsBreak(true);
      setTime(breakTime);
    }
    setIsActive(false);
  };

  return (
    <div className='center'>
      <div>
        <h1>{isBreak ? 'Break Time' : 'Work Time'}</h1>
        <div className='timer'>{formatTime(time)}</div>
        <button onClick={handleStartPause} className='button'>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset} className='button'>Reset</button>
        <button onClick={handleToggleMode} className='button'>
          {isBreak ? 'Switch to Work' : 'Switch to Break'}
        </button>
        <br />
        <Link to="/settings">
          <button className='button' onClick={playSound2}>Settings</button>
        </Link>
      </div>
    </div>
  );
};

export default PomodoroTimer;
