import React, { useState, useEffect } from 'react';
import useInterval from '../Hooks/interval';
import moment from 'moment'
import SetTimer from '../SetTimer';
 import './index.css';

export default function Timer() {
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [mode, setMode] = useState<string>('session');
  const [sessionTime, setSessionTime] = useState<number>(25);
  const [breakTime, setBreakTime] = useState<number>(5);

  useInterval(() => setTime(time - 1000), isActive ? 1000: 0);
  
  useEffect(() => {
    setTime(sessionTime*60*1000);
  },[sessionTime]);

  useEffect(() =>{
    if (time ===0) {
      if(mode === 'session'){
        setMode('break');
        setTime(breakTime*60*1000);
      } else if (mode === 'break'){
        setMode('session');
        setTime(sessionTime*60*1000);
      }
    }
  },[time, mode, sessionTime, breakTime]);

  return (
    <div className="Timer">
      <h2 className="Title">Pomodoro Timer</h2>
      <h2 className="Clock">{moment(time).format('mm:ss')}</h2> 
    </div>
  );
}
