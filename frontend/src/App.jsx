import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Navbar from './components/common/Navbar'
import VerifyEmail from './pages/VerifyEmail'

const App = () => {
  
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />}  />
        
      </Routes>
    </div>
  )
}

export default App