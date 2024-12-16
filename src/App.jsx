import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router'
import SignIn from './pages/user/SignIn'
import SignUp from './pages/user/SignUp'
import Tasks from './pages/task/Tasks'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn/>}/>
        <Route path='/register' element={<SignUp/>}/>
        <Route path='/' element={<Tasks/>}/>
      </Routes>
    </Router>
  )
}

export default App
