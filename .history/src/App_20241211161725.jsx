import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router'
import SignIn from './pages/user/SignIn'
import SignUp from './pages/user/SignUp'
import TaskDashboard from './pages/task/TaskDashboard'
import Sidebar from './components/ui/Sidebar'

function App() {
  return (
    <Router>
      <div>
        <Sidebar/>
      </div>
      <Routes>
        <Route path="/login" element={<SignIn/>}/>
        <Route path='/register' element={<SignUp/>}/>
        <Route path='/' element={<TaskDashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App
