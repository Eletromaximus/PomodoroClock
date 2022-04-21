import React, { useState, useEffect } from 'react'
// import useSound from 'use-sound'

// import 'react-circular-progressbar/dist/styles.css'
// import './App.scss'
// import './CircularProgress.scss'
// @ts-ignore
// import sound from './Timer/377639__danarobinsondesignsgmailcom__b15.mp3'

export default function App () {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(60)
  const [displayMessage, setDisplayMessage] = useState(false)
  // const [playOn] = useSound(sound, { volume: 0.5 })

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes.toString()
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds.toString()

  useEffect(() => {
    const interval = setInterval(() => {
      clearInterval(interval)
      if (seconds === 0) {
        if (minutes !== 0) {
          setSeconds(59)
          setMinutes(minutes - 1)
        } else {
          const minutes = displayMessage ? 24 : 4
          const seconds = 59

          setSeconds(seconds)
          setMinutes(minutes)
          setDisplayMessage(!displayMessage)
        }
      } else {
        setSeconds(seconds - 1)
      }
    }, 1000)
  }, [seconds])

  return (
    <div className="Timer">
      <h2 className="Title">Pomodoro Timer</h2>
      <h2 className="Clock">{timerMinutes}:{timerSeconds}</h2>

    <span className="c-circular-progress c-circular-progress--4"></span>

    </div>
  )
}
