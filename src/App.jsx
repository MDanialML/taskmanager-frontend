
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddTaskPage from './pages/AddTaskPage'
import DashboardPage from './pages/DashboardPage'
import ErrorPage from './pages/ErrorPage'
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import UpdateTaskPage from './pages/UpdateTaskPage'

function App() {
 
    
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/add-task" element={<AddTaskPage />} />
        <Route path="/update-task/:id" element={<UpdateTaskPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
