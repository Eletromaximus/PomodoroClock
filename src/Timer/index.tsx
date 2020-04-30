import React, { useState, useEffect } from 'react';
import useInterval from '../Hooks/interval';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import moment from 'moment'
import './index.css';


export default function Timer() {
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [mode, setMode] = useState<string>('break');
  const [sessionTime, setSessionTime] = useState<number>(25);
  const [breakTime, setBreakTime] = useState<number>(5);
  const [maxTime, setMaxTime] = useState<number>(0);

  useInterval(() => setTime(time - 1000), isActive ? 1000: 0);
  
  useEffect(() => {
    setTime(sessionTime*60*1000);
  },[sessionTime]);

  useEffect(() =>{
    if (time ===0) {
      if(mode === 'session'){
        setMode('break');
        setTime(breakTime*60*1000);
        setMaxTime(breakTime*60*1000);
      } else if (mode === 'break'){
        setMode('session');
        setTime(sessionTime*60*1000);
        setMaxTime(sessionTime*60*1000);
      }
    }
  },[time, mode, sessionTime, breakTime,maxTime]);

  const handleReset = () => {
    
    setIsActive(false)
    setMode('session')
    setBreakTime(5)
    setSessionTime(25)
    setTime(25 * 60 * 1000)
  }

  

const play = <p>Play</p>;
const pause = <p>Pause</p>;

  return (
    <div className="Timer">
      <h2 className="Title">Pomodoro Timer</h2>
      <h2 className="Clock">{moment(time).format('mm:ss')}</h2>

      <button id="play-pause" onClick={() =>{setIsActive(!isActive)}}>
        {isActive? pause: play}
      </button>
      <button id="reset" onClick={() =>{handleReset()}}>Reset</button>
     
      <CircularProgressbar 
        value={maxTime-time} 
        maxValue={maxTime} 
        minValue={1}
        text={''} 
        strokeWidth={2} 
        styles={buildStyles({
          trailColor: 'grey',
          pathColor: 'rgb(0,255,255)'
        })}
      />
      
    </div>
  );
}
