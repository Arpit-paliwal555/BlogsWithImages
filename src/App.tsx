import './App.css'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Home } from './components/Home'
import SignupForm from './components/SignUp'
import LoginForm from './components/Login'
import LandingPage from './components/LandingPage'
import CreateBlog from './components/PublishBlog'
import { MyBlogs } from './components/MyBlogs'


function LandingLayout() {
  return (
    <>
      <Outlet /> 
    </>
  );
}


function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}


function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* Public landing route with its own layout */}
          <Route element={<LandingLayout />}>
            <Route path="/" element={<LandingPage />} />
          </Route>

          {/* Everything else uses the main app layout */}
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/publish" element={<CreateBlog />} />
            <Route path="/my-blogs" element={<MyBlogs />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App
