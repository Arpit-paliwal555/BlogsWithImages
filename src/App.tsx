import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Home } from './components/Home'
import SignupForm from './components/SignUp'
import LoginForm from './components/Login'
function App() {

  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/signup' element={<SignupForm />}/>
          <Route path='/login' element={<LoginForm />}/>
        </Routes>
      </Router>
      
    </>
  )
}

export default App
