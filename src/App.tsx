import { useState } from 'react'
import { HomePage } from './pages/HomePage'
import { TimerPage } from './pages/TimerPage'
import { TimerProvider } from './Provider/TimerProvider'

import './App.scss'

export default function App () {
  const [page, setPage] = useState(true)

  const selectPage = page === true
    ? <HomePage changePage={() => setPage(!page)} />
    : <TimerPage pageChange={() => setPage(!page)} />

  return (
    <TimerProvider>
      {selectPage}
    </TimerProvider>
  )
}
