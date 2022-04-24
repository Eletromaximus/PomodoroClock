import { useContext, useEffect, useState } from 'react'
import { TimerContext } from '../../Provider/TimerProvider'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import './styles.scss'
import useSound from 'use-sound'

import sound from './sound.mp3'

interface ITimePage {
  pageChange: () => void
}

export function TimerPage ({ pageChange }: ITimePage) {
  const [playOn] = useSound(sound)
  const {
    work,
    breaks,
    sessions,
    setSessions
  } = useContext(TimerContext)
  const [isWork, setIsWork] = useState(true)
  const [minutes, setMinutes] = useState(work)
  const [seconds, setSeconds] = useState(0)
  const [bar, setBar] = useState(1)
  const [barProgress, setBarProgress] = useState(1)
  const [pause, setPause] = useState(false)

  const message = isWork === true
    ? 'Trabalho'
    : 'Pausa'

  const valor = isWork === true ? work : breaks

  function Progress () {
    const porcent = (((valor * 60) - ((valor * 60) - bar)) / (valor * 60)) * 100
    setBar(bar + 1)
    setBarProgress(porcent)
  }

  const textMinutes = minutes.toString().padStart(2, '0')
  const textSeconds = seconds.toString().padStart(2, '0')

  useEffect(() => {
    if (!pause && sessions >= 0) {
      const interval = setInterval(() => {
        clearInterval(interval)

        if (seconds !== 0) {
          setSeconds(seconds - 1)
          Progress()
        } else {
          if (minutes !== 0) {
            setMinutes(minutes - 1)
            setSeconds(59)
            Progress()
          } else {
            if (sessions === 0 && !isWork && minutes === 0) {
              setMinutes(work)
              setIsWork(true)
              setPause(true)
              setSessions(1)
              setBar(1)
              playOn()
              pageChange()
            } else {
              const register = isWork === true
                ? (breaks)
                : (minutes)

              playOn()
              setMinutes(register)
              setSessions(sessions - 1)
              setIsWork(!isWork)
              setBar(1)
            }
          }
        }
      }, 1000)
    }
  }, [pause, seconds, minutes])

  return (
    <div className='container'>
      <header className='cabecario'>
        <h1>Pomodoro</h1>

        <button className='pause'
          onClick={() => setPause(!pause)}
        >
          <PlayCircleIcon fontSize='large' />
        </button>

        <button onClick={pageChange}>
          Início
        </button>
      </header>

      <div className='content'>
        <div className='timer'>
          <h1>{textMinutes}:{textSeconds}</h1>

          <div id='myProgress'>
            <div id='myBar' style={{
              width: `${barProgress}%`
            }} />
          </div>
        </div>

        <div className='infos'>
          {message}
        </div>
      </div>
    </div>
  )
}
