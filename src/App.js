import './App.css';
import React, { useState } from 'react';
import Length from './Length.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import tomato from './media/tomato.png';
import audio from './media/beep.mp3';

function App() {

  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const breakAudio = new Audio(audio);

  const playBreakSound = () => {

    breakAudio.currentTime = 0;
    breakAudio.play();
  };

  const formatTime = (time) => {

    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
  };

  const changeTime = (amount, type) => {

    if (type === "break" && breakTime >= 120 && breakTime < 3600) {
      setBreakTime(prev => prev + amount);
    } else if (type === "break" && breakTime === 60 && amount > 0) {
      setBreakTime(prev => prev + amount);
    } else if (type === "break" && breakTime === 3600 && amount < 0) {
      setBreakTime(prev => prev + amount);
    } else if (type === "session" && sessionTime >= 120 && sessionTime < 3600) {
      setSessionTime(prev => prev + amount);
    } else if (type === "session" && sessionTime === 60 && amount > 0) {
      setSessionTime(prev => prev + amount);
    } else if (type === "session" && sessionTime === 3600 && amount < 0) {
      setSessionTime(prev => prev + amount);
    };

    if (type === "session" && sessionTime >= 120 && sessionTime < 3600 && !timerOn) {
      setDisplayTime(sessionTime + amount);
    } else if (type === "session" && sessionTime === 60 && amount > 0 && !timerOn) {
      setDisplayTime(sessionTime + amount);
    } else if (type === "session" && sessionTime === 3600 && amount < 0 && !timerOn) {
      setDisplayTime(sessionTime + amount);
    };
  };

  const controlTime = () => {

    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = onBreak;

    if (!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setDisplayTime((prev) => {
            if (prev <= 0 && !onBreakVariable) {
              playBreakSound();
              onBreakVariable = true;
              setOnBreak(true);
              return breakTime;
            } else if (prev <= 0 && onBreakVariable) {
              playBreakSound();
              onBreakVariable = false;
              setOnBreak(false);
              return sessionTime;
            };
            return prev - 1;
          });
          nextDate += second;
        };
      }, 30);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    };

    if (timerOn) {
      clearInterval(localStorage.getItem("interval-id"));
    };

    setTimerOn(!timerOn);
  };

  const resetTime = () => {
    clearInterval(localStorage.getItem("interval-id"));
    setTimerOn(false);
    setOnBreak(false);
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
  };

  return (
    <div id="main-container" className="container-fluid text-center">

      <div id="title-container">
        <h1>Pomodoro Clock</h1>
      </div>

      <div id="ajusts-container" className="d-flex justify-content-center">
        <Length
          title={"Break Length"}
          changeTime={changeTime}
          type={"break"}
          time={breakTime}
          formatTime={formatTime}
        />
        <Length
          title={"Session Length"}
          changeTime={changeTime}
          type={"session"}
          time={sessionTime}
          formatTime={formatTime}
        />
      </div>

      <div id="display-container" className="d-flex flex-column">
        <h2 id="timer-label">{onBreak ? "Now: Break" : timerOn ? "Now: Session" : "Click To Start"}</h2>
        <h1 id="time-left">{formatTime(displayTime)}</h1>
        <div id="timer-controls" className="d-flex justify-content-center">
          <button id="start_stop" className="button" onClick={controlTime}>
            {timerOn ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
          </button>
          <button id="reset" className="button" onClick={resetTime}>
            <FontAwesomeIcon icon={faSyncAlt} />
          </button>
        </div>
      </div>

      <div id="footer-container">
        <p>A freeCodeCamp project by Victor</p>
      </div>

      <img src={tomato} id="tomato" className="img-fluid" alt="background-tomato"></img>

    </div>
  );
};

export default App;