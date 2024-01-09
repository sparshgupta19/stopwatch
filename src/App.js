import React, { useState, useRef } from "react";
import "./index.css";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const intervalRef = useRef(null);

  const formatTime = (time) => {
    const minutes = `${time.minutes}`;
    const seconds = time.seconds < 10 ? `0${time.seconds}` : `${time.seconds}`;
    return `Time: ${minutes}:${seconds}`;
  };

  const startTimer = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        const seconds = prevTime.seconds + 1;
        const minutes = prevTime.minutes + Math.floor(seconds / 60);
        return {
          minutes: minutes,
          seconds: seconds % 60,
        };
      });
    }, 1000);
  };

  const stopTimer = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTime({ minutes: 0, seconds: 0 });
  };

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div className="display">{formatTime(time)}</div>
      <br />
      <div className="buttons">
        {!isRunning ? (
          <button onClick={startTimer}>Start</button>
        ) : (
          <button onClick={stopTimer}>Stop</button>
        )}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default App;
