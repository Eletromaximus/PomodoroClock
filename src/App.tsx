import React, { useState, useEffect } from 'react';
import useInterval from './Hooks/interval';
import useSound from 'use-sound';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import moment from 'moment'
import './App.css';
//@ts-ignore
import sound from './Timer/377639__danarobinsondesignsgmailcom__b15.mp3';


export default function App() {
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [mode, setMode] = useState<string>('break');
  const [sessionTime, setSessionTime] = useState<number>(25);
  const [breakTime, setBreakTime] = useState<number>(5);
  const [maxTime, setMaxTime] = useState<number>(0);
  const [playOn] = useSound(sound, {volume: 0.5});

  

  useInterval(() => setTime(time - 1000), isActive ? 1000: 0);
  
  useEffect(() => {
    setTime(sessionTime*60*1000);
  },[sessionTime]);

  useEffect(() =>{
    if (time ===0) {
      if(mode === 'session'){
        playOn();
        setMode('break');
        setTime(breakTime*60*1000);
        setMaxTime(breakTime*60*1000);
        
      } else if (mode === 'break'){       
        setMode('session');
        setTime(sessionTime*60*1000);
        setMaxTime(sessionTime*60*1000);
      }
    }
  },[time, mode, sessionTime, breakTime,maxTime, playOn]);

  const handleReset = () => {
    
    setIsActive(false)
    setMode('session')
    setBreakTime(5)
    setSessionTime(25)
    setTime(25 * 60 * 1000)
  }

  return (
    <div className="Timer">
      <h2 className="Title">Pomodoro Timer</h2>
      <h2 className="Clock">{moment(time).format('mm:ss')}</h2>

     

      <button id="play-pause" onClick={() =>{setIsActive(!isActive)}}>
        {isActive? <p>Pause</p>: <p>Play</p>}
      </button>

      <button id="reset" onClick={() =>handleReset()}>Reset</button>
      
     
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

