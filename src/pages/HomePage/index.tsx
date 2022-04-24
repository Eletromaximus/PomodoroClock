import { useContext } from 'react'
import { TimerContext } from '../../Provider/TimerProvider'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'

import './styles.scss'

interface IHomePage {
  changePage: () => void
}

export function HomePage ({ changePage }: IHomePage) {
  const {
    breaks,
    work,
    sessions,
    setBreaks,
    setWork,
    setSessions
  } = useContext(TimerContext)
  // const [playOn] = useSound(sound, { volume: 0.5 })

  const timerMinutes = work < 10 ? `0${work}` : work.toString()
  const timerBreaks = breaks < 10
    ? `0${breaks}`
    : breaks.toString()

  function reducerProp (number: number) {
    if (number > 0) {
      return number - 1
    } else {
      return 0
    }
  }

  function addProp (number: number) {
    if (number > 60) {
      return 0
    } else {
      return (number += 1)
    }
  }

  return (
    <div className='Timer'>
      <span className='Title'>Pomodoro</span>

      <div className='box-timer'>
        <div className='work'>
          <span>Trabalho</span>

          <div className='set-work'>
            <button
              className='add-work'
              onClick={() => setWork(addProp(work))}
            >
              <ArrowCircleUpIcon fontSize='large' />
            </button>

            <div
              className='box-work'
            >
              {timerMinutes}
            </div>

            <button
              className='rm-work'
              onClick={() => setWork(reducerProp(work))}
            >
              <ArrowCircleDownIcon fontSize='large' />
            </button>
          </div>
        </div>

        <div className='breaks'>
          <span>Pausa</span>

          <div
            className='set-breaks'
          >
            <button
              className='add-breaks'
              onClick={() => setBreaks(addProp(breaks))}
            >
              <ArrowCircleUpIcon fontSize='large' />
            </button>

            <div
              className='box-breaks'
            >
              {timerBreaks}
            </div>

            <button
              className='rm-breaks'
              onClick={() => setBreaks(reducerProp(breaks))}
            >
              <ArrowCircleDownIcon fontSize='large' />
            </button>
          </div>
        </div>

        <div className='sessions'>
          <span>Sessões</span>

          <div className='set-sessions'>
            <button
              className='add-sessions'
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
              className='rm-sessions'
              onClick={() => setSessions(reducerProp(sessions))}
            >
              <ArrowCircleDownIcon fontSize='large' />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={changePage}
        className='Clock'
      >
        Continuar
      </button>
    </div>
  )
}
