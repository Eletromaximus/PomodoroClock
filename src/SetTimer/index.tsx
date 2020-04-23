import React from 'react';

// import { Container } from './styles';


export default function SetTimer() {
    

    function handleIncrement () {
        
    }
    function handleDecrement () {

    }
    function handlePausePlay () {

    }
  return (
    <div>
      <button>Play</button>
      <button>Long Break</button>
      <button onClick={handlePausePlay}>Short Break</button>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
}
