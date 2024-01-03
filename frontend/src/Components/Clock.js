// Clock.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return () => clearInterval(timerID);
  }, []);

  const tick = () => {
    setTime(new Date());
  }

  return <div className="text-white">{time.toLocaleTimeString()}</div>;
};

export default Clock;
