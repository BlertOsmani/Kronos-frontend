import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router'
import SignIn from './pages/user/SignIn'
import SignUp from './pages/user/SignUp'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn/>}/>
        <Route path='/register' element={<SignUp/>}/>
        <Route path='/' element={<TaskDashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App
