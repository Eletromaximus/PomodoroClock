import { createContext, ReactNode, useState } from 'react'

export const TimerContext = createContext({
  work: 25,
  breaks: 5,
  sessions: 1,
  setWork: (action: number) => {},
  setBreaks: (action: number) => {},
  setSessions: (action: number) => {}
})

interface ITimerProvider {
  children: ReactNode
}

export function TimerProvider ({ children }: ITimerProvider) {
  const [work, setWork] = useState(25)
  const [breaks, setBreaks] = useState(5)
  const [sessions, setSessions] = useState(1)

  return (
    <TimerContext.Provider value={{
      work,
      breaks,
      sessions,
      setBreaks,
      setSessions,
      setWork
    }}>
      {children}
    </TimerContext.Provider>
  )
}
