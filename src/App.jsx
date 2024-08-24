import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage'
import Register from './components/Authetication/Register';
import Login from './components/Authetication/Login';
import FlashCardApp from './components/Main/FlashCardApp';
import DemoFlash from './components/Main/DemoFlash';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<FlashCardApp />} />
        <Route path="/demo" element={<DemoFlash />} />

      </Routes>
    </Router>
  )
}

export default App
