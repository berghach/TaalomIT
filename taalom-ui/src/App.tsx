// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './components/login'
import Dashboard from './components/dashboard'
import PrivateRoute from './components/privateRoute'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
