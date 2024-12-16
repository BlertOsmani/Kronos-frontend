import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn/>}/>
        <Route path='/register' element={<SignUp/>}/>
      </Routes>
    </Router>
  )
}

export default App
