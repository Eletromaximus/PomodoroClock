import { useState } from 'react'
import { HomePage } from './pages/HomePage'
import { TimerPage } from './pages/TimerPage'
import { TimerProvider } from './Provider/TimerProvider'
// import useSound from 'use-sound'

import './App.scss'
// @ts-ignore
// import sound from './Timer/377639__danarobinsondesignsgmailcom__b15.mp3'

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
