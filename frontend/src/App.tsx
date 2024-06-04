import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/LandingPage'
import Appbar from './components/Appbar'
import Home from './pages/Home'
import { useState } from 'react'

function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <>
      <BrowserRouter>
      <Appbar setShowSignUp={setShowSignUp} setShowSignIn={setShowSignIn}  />
        <Routes>
          <Route path='/' element={<Landing showSignIn={showSignIn} showSignUp={showSignUp} setShowSignUp={setShowSignUp} setShowSignIn={setShowSignIn} /> }></Route>
          <Route path='/home' element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
