import React, { useState, useEffect } from 'react';


function App() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [mode, setMode] = useState('session');

  
  function toggle () {
    setIsActive(!isActive);
  }

  useEffect(() => {
    if(isActive){
      setTime(+1);
    }
  },[isActive, time])

  return (
    <div className="App">
      The time is {time}
    </div>
  );
}

export default App;
