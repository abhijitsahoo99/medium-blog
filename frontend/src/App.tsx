import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Appbar from './components/Appbar'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <BrowserRouter>
      <Appbar />
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
