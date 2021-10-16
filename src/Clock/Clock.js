import React, { useState } from 'react';

function Clock() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [sessionOn, setSessionOn] = useState(true);
  const [intervalId, setIntervalId] = useState(0);

  const breakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };
  const breakIncrement = () => {
    if (breakLength < 60) setBreakLength(breakLength + 1);
  };
  const sessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft(sessionLength * 60 - 60);
    }
  };
  const sessionIncrement = () => {
    if (sessionLength < 60) setSessionLength(sessionLength + 1);
    setTimeLeft(sessionLength * 60 + 60);
  };

  const reset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(1500);
    setSessionOn(true);
    if (audioBeep != null) {
      audioBeep.pause();
      audioBeep.currentTime = 0;
    }

    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      return;
    }
  };

  const minutes = `${
    Math.floor(timeLeft / 60) < 10
      ? '0' + Math.floor(timeLeft / 60)
      : Math.floor(timeLeft / 60)
  }`;
  const seconds = `${
    timeLeft % 60 < 10 ? '0' + (timeLeft % 60) : timeLeft % 60
  }`;

  if (sessionOn === true) {
    if (minutes === '0-1' && seconds === '0-1') {
      setTimeLeft(breakLength * 60);
      setSessionOn(false);
    }
  } else {
    if (minutes === '0-1' && seconds === '0-1') {
      setTimeLeft(sessionLength * 60);
      setSessionOn(true);
    }
  }

  const countdown = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      return;
    }

    const newIntervalId = setInterval(() => {
      setTimeLeft((prevCount) => prevCount - 1);
    }, 1000);
    setIntervalId(newIntervalId);
  };

  const audioBeep = document.getElementById('beep');
  if (minutes === '0-1' && seconds === '0-1') {
    audioBeep.play();
  }

  //-------------------------------------------------------------------
  return (
    <div>
      <h1 data-testid='header'>My Clock 1</h1>
      <div id='break-label'>Break Length</div>
      <div id='break-length'>{breakLength}</div>
      <div id='session-label'>Session Length</div>
      <div id='session-length'>{sessionLength}</div>
      <button id='break-decrement' onClick={breakDecrement}>
        Break-decrement
      </button>
      <button id='break-increment' onClick={breakIncrement}>
        Break-increment
      </button>
      <button id='session-decrement' onClick={sessionDecrement}>
        session-decrement
      </button>
      <button id='session-increment' onClick={sessionIncrement}>
        session-increment
      </button>

      <div id='timer-label'>{sessionOn ? 'Session' : 'Break'}</div>
      <div id='time-left'>
        {minutes}:{seconds}
      </div>
      <button id='start_stop' onClick={countdown}>
        Start-Stop
      </button>
      <button id='reset' onClick={reset}>
        reset
      </button>
      <audio
        id='beep'
        src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
      ></audio>
    </div>
  );
}

export default Clock;
