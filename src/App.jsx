import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Signup from './components/common/Signup'
import LoginCustomer from './components/common/LoginCustomer';
import LoginRestaurant from './components/common/LoginRestaurant';
import OtpVerification from './components/common/OtpVerification';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/customer/login" element={<LoginCustomer/>} />
        <Route path="/restaurant/login" element={<LoginRestaurant/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otpverification" element={<OtpVerification />} />
      </Routes>
    </Router>
  )
}

export default App
