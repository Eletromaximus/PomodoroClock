import React, { useState, useEffect } from 'react'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
// import useSound from 'use-sound'

import './App.scss'
// @ts-ignore
// import sound from './Timer/377639__danarobinsondesignsgmailcom__b15.mp3'

export default function App () {
  const [minutes, setMinutes] = useState(24)
  const [seconds, setSeconds] = useState(59)
  const [sessions, setSessions] = useState(1)
  const [displayMessage, setDisplayMessage] = useState(false)
  const [pause, setPause] = useState(false)
  // const [playOn] = useSound(sound, { volume: 0.5 })

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes.toString()
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds.toString()

  function reducerProp (number: number) {
    if (number > 0) {
      return number - 1
    } else {
      return 0
    }
  }

  function addProp (number: number) {
    if (number > 60) {
      return 1
    } else {
      return (number += 1)
    }
  }

  useEffect(() => {
    if (pause && sessions > 0) {
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
            setSessions(sessions - 1)
            setDisplayMessage(!displayMessage)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    }
  }, [seconds, pause])

  return (
    <div className="Timer">
      <span className="Title">Pomodoro</span>

      <div className='box-timer'>
        <div className="minutes">
          <span>Minutes</span>
          <div className="set-minutes">
            <button
              disabled={pause}
              className="add-minutes"
              onClick={() => setMinutes(addProp(minutes))}
            >
              <ArrowCircleUpIcon fontSize='large' />
            </button>

            <div
              className='box-minutes'
            >
              {timerMinutes}
            </div>

            <button
              disabled={pause}
              className="rm-minutes"
              onClick={() => setMinutes(reducerProp(minutes))}
            >
              <ArrowCircleDownIcon fontSize='large' />
            </button>
          </div>
        </div>

        <div className="seconds">
          <span>Seconds</span>
          <div
            className="set-seconds"
          >
            <button
              disabled={pause}
              className="add-seconds"
              onClick={() => setSeconds(addProp(seconds))}
            >
              <ArrowCircleUpIcon fontSize='large' />
            </button>

            <div
              className='box-seconds'
            >
              {timerSeconds}
            </div>

            <button
              disabled={pause}
              className="rm-seconds"
              onClick={() => setSeconds(reducerProp(seconds))}
            >
              <ArrowCircleDownIcon fontSize='large' />
            </button>
          </div>
        </div>

        <div className="sessions">
          <span>Sessions</span>
          <div className="set-sessions">
            <button
              disabled={pause}
              className="add-sessions"
              onClick={() => setSessions(addProp(sessions))}
            >
              <ArrowCircleUpIcon fontSize='large' />
            </button>

            <div
              className='box-sessons'
            >
              {sessions}
            </div>

            <button
              disabled={pause}
              className="rm-sessions"
              onClick={() => setSessions(reducerProp(sessions))}
            >
              <ArrowCircleDownIcon fontSize='large' />
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          if (sessions > 0) {
            setPause(!pause)
          } else {
            setPause(false)
          }
        }}
        className="Clock"
      >
        {pause === true ? 'Pausar' : 'Continuar'}
      </button>
    </div>
  )
}
