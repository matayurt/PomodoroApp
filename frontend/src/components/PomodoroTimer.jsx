// src/components/PomodoroTimer.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../main.css"

const PomodoroTimer = () => {
  // Durum (state) değişkenlerini tanımlıyoruz
  const [time, setTime] = useState(1500);
  const [isActive, setIsActive] = useState(false); // Sayaç aktif mi değil mi
  const [isBreak, setIsBreak] = useState(false); // Mola zamanı mı değil mi
  const [workTime, setWorkTime] = useState(1500); // Çalışma süresi
  const [breakTime, setBreakTime] = useState(300); // Mola süresi

  useEffect(() => {
    setTime(workTime); // workTime prop değiştiğinde zamanlayıcıyı güncelle
  }, [workTime]);


  useEffect(() => {
    let interval = null;

    if (isActive) {
      // Sayaç aktifse, her saniyede bir zamanı azaltıyoruz
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      // Sayaç aktif değilse ve zaman 0 değilse, interval'i temizliyoruz
      clearInterval(interval);
    }

    if (time === 0) {
      // Zaman sıfırlandığında
      if (isBreak) {
        // Mola zamanıysa, çalışma süresine geçiyoruz
        setTime(workTime);
        setIsBreak(false);
      } else {
        // Çalışma zamanıysa, mola süresine geçiyoruz
        setTime(breakTime);
        setIsBreak(true);
      }
      playSound();
    }

    return () => clearInterval(interval); // Bileşen her güncellendiğinde interval'i temizliyoruz
  }, [isActive, time, isBreak, workTime, breakTime]);

  const playSound = () => {
    const audio = new Audio('alarm_sound.mp3'); // Alarm sesi dosyasını çalıyoruz
    audio.play();
  };

  const playSound2 = () => {
    const audio = new Audio('click_sound.mp3');
    audio.play()
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`; // Zamanı dakika ve saniye formatında gösteriyoruz
  };

  const handleStartPause = () => {
    playSound2()
    setIsActive(!isActive); // Sayaç duraklatılıyor veya başlatılıyor
  };

  const handleReset = () => {
    playSound2()
    setIsActive(false); // Sayaç duraklatılıyor
    setTime(workTime); // Zaman çalışma süresine sıfırlanıyor
    setIsBreak(false); // Çalışma moduna geçiliyor
  };

  const handleToggleMode = () => {
    playSound2()
    if (isBreak) {
      setIsBreak(false)
      setTime(workTime)
    }else {
      setIsBreak(true)
      setTime(breakTime)
    }
    setIsActive(false) // Mod değiştirirken sayaç duraklatılır.
  }

  return (
    <div className='center'>
      <div>
        <h1>{isBreak ? 'Break Time' : 'Work Time'}</h1>
        <div className='timer'>{formatTime(time)}</div>
        <button onClick={handleStartPause} className='button'>{isActive ? 'Pause' : 'Start'}</button>
        <button onClick={handleReset} className='button'>Reset</button>
        <button onClick={handleToggleMode} className='button'>{isBreak ? 'Switch to Work' : 'Switch to Break'}</button>
        <br />
        <Link to="/settings">
          <button className='button' onClick={playSound2}>Settings</button>
        </Link>
      </div>
    </div>
  );
};

export default PomodoroTimer;
