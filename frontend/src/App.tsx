import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Appbar from './components/Appbar'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Home from './pages/Home'

function App() {

  return (
    <>
      <BrowserRouter>
      <Appbar />
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/signin' element={<Signin />}></Route>
          <Route path='/home' element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
