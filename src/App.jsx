import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router'
import SignIn from './pages/user/auth/SignIn'
import SignUp from './pages/user/auth/SignUp'
import Tasks from './pages/task/Tasks'
import NavbarLayout from './layouts/NavbarLayout'
import Profile from './pages/user/profile/Profile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn/>}/>
        <Route path='/register' element={<SignUp/>}/>
        <Route element={<NavbarLayout/>}>
            <Route path='/' element={<Tasks/>}/>
            <Route path='/profile' element={<Profile/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
