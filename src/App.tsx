import React, { useState, useEffect } from 'react'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
// import useSound from 'use-sound'

import './App.scss'
// @ts-ignore
// import sound from './Timer/377639__danarobinsondesignsgmailcom__b15.mp3'

export default function App () {
  const [work, setWork] = useState(25)
  const [breaks, setBreaks] = useState(5)
  const [sessions, setSessions] = useState(1)
  const [isWork, setIsWork] = useState(true)
  const [pause, setPause] = useState(true)
  const [memory, setMemory] = useState({
    work,
    breaks,
    sessions
  })
  // const [playOn] = useSound(sound, { volume: 0.5 })

  const timerMinutes = work < 10 ? `0${work}` : work.toString()
  const timerSeconds = breaks < 10 ? `0${breaks}` : breaks.toString()

  function reducerProp (number: number, type: string) {
    if (number > 0) {
      setMemory({
        ...memory,
        [type]: (number - 1)
      })
      return number - 1
    } else {
      return 0
    }
  }

  function addProp (number: number, type: string) {
    if (number > 60) {
      return 1
    } else {
      setMemory({
        ...memory,
        [type]: (number + 1)
      })

      return (number += 1)
    }
  }

  useEffect(() => {
    if (pause && sessions >= 0) {
      const interval = setInterval(() => {
        clearInterval(interval)

        if (work !== 0) {
          setWork(work - 1)
        } else {
          if (sessions === 0) {
            setPause(true)
            setSessions(1)
            setWork(memory.work)
            setIsWork(true)
            return
          }
          const register = isWork === true
            ? breaks
            : memory.work

          setWork(register)
          setSessions(sessions - 1)
          setIsWork(!isWork)
        }
      }, 60000)
    }
  }, [pause, work])

  return (
    <div className="Timer">
      <span className="Title">Pomodoro</span>

      <div className='box-timer'>
        <div className="work">
          <span>Trabalho</span>
          <div className="set-work">
            <button
              disabled={!pause}
              className="add-work"
              onClick={() => setWork(addProp(work, 'work'))}
            >
              <ArrowCircleUpIcon fontSize='large' />
            </button>

            <div
              className='box-work'
            >
              {timerMinutes}
            </div>

            <button
              disabled={!pause}
              className="rm-work"
              onClick={() => setWork(reducerProp(work, 'work'))}
            >
              <ArrowCircleDownIcon fontSize='large' />
            </button>
          </div>
        </div>

        <div className="breaks">
          <span>Pausa</span>
          <div
            className="set-breaks"
          >
            <button
              disabled={!pause}
              className="add-breaks"
              onClick={() => setBreaks(addProp(breaks, 'breaks'))}
            >
              <ArrowCircleUpIcon fontSize='large' />
            </button>

            <div
              className='box-breaks'
            >
              {timerSeconds}
            </div>

            <button
              disabled={!pause}
              className="rm-breaks"
              onClick={() => setBreaks(reducerProp(breaks, 'breaks'))}
            >
              <ArrowCircleDownIcon fontSize='large' />
            </button>
          </div>
        </div>

        <div className="sessions">
          <span>Sessões</span>
          <div className="set-sessions">
            <button
              disabled={!pause}
              className="add-sessions"
              onClick={() => setSessions(addProp(sessions, 'sessions'))}
            >
              <ArrowCircleUpIcon fontSize='large' />
            </button>

            <div
              className='box-sessons'
            >
              {sessions}
            </div>

            <button
              disabled={!pause}
              className="rm-sessions"
              onClick={() => setSessions(reducerProp(sessions, 'sessions'))}
            >
              <ArrowCircleDownIcon fontSize='large' />
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={() => setPause(false)}
        className="Clock"
      >
        {pause === false ? 'Pausar' : 'Continuar'}
      </button>
    </div>
  )
}
