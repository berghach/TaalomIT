// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './components/auth/login'
import Dashboard from './components/pages/dashboard'
import AdminPage from './components/pages/adminPage'
import TeacherPage from './components/pages/teacherPage'
import StudentPage from './components/pages/studentPage'
import PrivateRoute from './components/privateRoute'
import { Role } from './models/roles'
import NotFound from './components/notFound'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

        <Route 
         path='/admin'
         element={<PrivateRoute allowedRoles={[Role.ADMIN]}>
          <AdminPage/>
          </PrivateRoute>}
        />

        <Route 
          path="/teacher" 
          element={
            <PrivateRoute allowedRoles={[Role.TEACHER]}>
              <TeacherPage />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/student" 
          element={
            <PrivateRoute allowedRoles={[Role.STUDENT]}>
              <StudentPage />
            </PrivateRoute>
          } 
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
