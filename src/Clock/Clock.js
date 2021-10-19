import React, { useState } from 'react';
import './Clock.scss';

function Clock() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [sessionOn, setSessionOn] = useState(true);
  const [intervalId, setIntervalId] = useState(0);

  const breakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
      setTimeLeft(breakLength * 60 - 60);
    }
  };
  const breakIncrement = () => {
    if (breakLength < 60) setBreakLength(breakLength + 1);
    setTimeLeft(breakLength * 60 + 60);
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
    }, 100);
    setIntervalId(newIntervalId);
  };

  const audioBeep = document.getElementById('beep');
  if (minutes === '0-1' && seconds === '0-1') {
    audioBeep.play();
  }
  //-----------------------------------animation-------------------------

  let dotArray = [];
  if (sessionOn === true) {
    for (let i = 0; i < sessionLength; i++) {
      dotArray.push(i);
    }
  } else {
    for (let i = 0; i < breakLength; i++) {
      dotArray.push(i);
    }
  }

  const dots = dotArray.map((item, index) => {
    let elements = dotArray.length;
    let radius = 150;
    let elementRadius = 5;
    let angle = ((2 * Math.PI) / elements) * item;

    let style = {
      position: 'absolute',
      //display: 'block',
      right: radius + radius * Math.sin(angle) - elementRadius,
      top: radius - radius * Math.cos(angle) - elementRadius,
    };

    return (
      <div
        key={index}
        style={style}
        className={index === Math.floor(timeLeft / 60) ? 'dotBright' : 'dot'}
      ></div>
    );
  });

  let gray = {
    filter: 'grayscale(80%)',
    transition: '1s',
    transitionTimingFunction: 'ease-out',
  };
  let grayStyle = {};

  if (intervalId === 0) {
    grayStyle = gray;
  } else {
    grayStyle = { transition: '1s', transitionTimingFunction: 'ease-out' };
  }

  //-------------------------------------------------------------------
  return (
    <div className='all'>
      <div className='dotContainer'>
        <div className='dotCont' style={grayStyle}>
          {dots}
          <div id='time-left'>
            {minutes}:{seconds}
          </div>
        </div>
      </div>
      <div className='controlElements'>
        <div className='breakControl'>
          <div
            id='break-increment'
            className='triButton increase'
            onClick={breakIncrement}
          ></div>
          <div id='break-label'>Break Length</div>
          <div id='break-length'>{breakLength}</div>
          <div
            id='break-decrement'
            className='triButton decrease'
            onClick={breakDecrement}
          ></div>
        </div>
        <div className='startReset'>
          <div id='timer-label'>{sessionOn ? 'Session' : 'Break'}</div>

          <button id='start_stop' onClick={countdown}>
            {intervalId ? 'Stop' : <div>HI</div>}
          </button>
          <button id='reset' className='btn btn-danger' onClick={reset}>
            reset
          </button>
        </div>
        <div className='sessionControl'>
          <div
            id='session-decrement'
            className='triButton increase'
            onClick={sessionDecrement}
          ></div>
          <div id='session-label'>Session Length</div>
          <div id='session-length'>{sessionLength}</div>
          <div
            id='session-increment'
            className='triButton decrease'
            onClick={sessionIncrement}
          ></div>
        </div>
      </div>

      <audio
        id='beep'
        src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
      ></audio>
    </div>
  );
}

export default Clock;
