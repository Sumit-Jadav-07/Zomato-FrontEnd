import { useState } from 'react'
import './App.css'
import Signup from './components/common/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Signup></Signup>
    </>
  )
}

export default App
