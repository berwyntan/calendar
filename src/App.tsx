import { useState } from 'react'
import './App.css'
import Layout from './pages/Layout'
import useCalendarStore from './store/useCalendarStore'

function App() {
  const month = useCalendarStore((state) => state.month)
  

  return (
    <div className="App">
      <Layout />
    </div>
  )
}

export default App
