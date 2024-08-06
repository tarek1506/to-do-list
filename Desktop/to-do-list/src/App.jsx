import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <div className='flex flex-col justify-between gap-[30vh]'>
        <Hero/>
      
      </div>
    </>
  )
}

export default App
