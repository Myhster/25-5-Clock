import React, { useState, useEffect } from 'react';

function Clock() {
  const [breakCounter, setBreakCounter] = useState(5);
  const [sessionCounter, setSessionCounter] = useState(25);
  const [timeSec, setTimeSec] = useState(sessionCounter * 60);
  const [timeString, setTimeString] = useState('25:00');
  const [intervalId, setIntervalId] = useState(0);
  const [breakTime, setBreakTime] = useState(false);

  const decreasePause = () => {
    if (breakCounter > 1) setBreakCounter(breakCounter - 1);
  };

  const increasePause = () => {
    if (breakCounter < 60) setBreakCounter(breakCounter + 1);
  };

  const decreaseSession = () => {
    if (sessionCounter > 1) {
      setSessionCounter(sessionCounter - 1);
      setTimeSec(sessionCounter * 60 - 60);
    }
  };

  const increaseSession = () => {
    if (sessionCounter < 60) {
      setSessionCounter(sessionCounter + 1);
      setTimeSec(sessionCounter * 60 + 60);
    }
  };

  const resetAll = () => {
    clearInterval(intervalId);
    setIntervalId(0);
    setBreakCounter(5);
    setSessionCounter(25);
    setTimeSec(1500);
    setBreakTime(false);
  };
  //-------------------timer-logic--------------------------

  const countdown = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      return;
    }
    const newIntervalId = setInterval(() => {
      setTimeSec((timeSec) => timeSec - 1);
    }, 1000);
    setIntervalId(newIntervalId);
  };

  //-----------------------------Use-Effect---------------------------
  useEffect(() => {
    let minutes = Math.floor(timeSec / 60);
    let seconds = timeSec % 60;
    if (timeSec < 0) {
      if (breakTime === false) {
        setTimeSec(breakCounter * 60);
        setBreakTime(true);
        console.log(breakTime);
      } else {
        setTimeSec(sessionCounter * 60);
        setBreakTime(false);
        console.log(breakTime);
      }
    }
    if (minutes < 10) {
      if (seconds < 10) {
        setTimeString(`0${minutes}:0${seconds}`);
      } else {
        setTimeString(`0${minutes}:${seconds}`);
      }
    } else {
      if (seconds < 10) {
        setTimeString(`${minutes}:0${seconds}`);
      } else {
        setTimeString(`${minutes}:${seconds}`);
      }
    }

    return () => {};
  }, [breakCounter, sessionCounter, timeSec, timeString]);
  //-------------------------------------------------------------------
  return (
    <div>
      <h1 data-testid='header'>My Clock 1</h1>
      <div id='break-label'>Break Length</div>
      <div id='session-label'>Session Length</div>
      <button id='break-decrement' onClick={decreasePause}>
        Pause-decrement
      </button>
      <button id='break-increment' onClick={increasePause}>
        Pause-increment
      </button>
      <button id='session-decrement' onClick={decreaseSession}>
        session-decrement
      </button>
      <button id='session-increment' onClick={increaseSession}>
        session-increment
      </button>
      <div id='break-length'>{breakCounter}</div>
      <div id='session-length'>{sessionCounter}</div>
      <div id='timer-label'>{breakTime ? 'Break' : 'Session'}</div>
      <div id='time-left'>{timeString}</div>
      <button id='start_stop' onClick={countdown}>
        {intervalId ? 'Stop Timer' : 'Start Timer'}
      </button>
      <button id='reset' onClick={resetAll}>
        reset
      </button>
    </div>
  );
}

export default Clock;
