import './App.css'
import { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Home } from './components/Home'
import SignupForm from './components/SignUp'
import LoginForm from './components/Login'
import LandingPage from './components/landingPage/LandingPage'
import CreateBlog from './components/PublishBlog'
import { MyBlogs } from './components/MyBlogs'
import { AuthContext } from './context/AuthContext'


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

function ProtectedRoutes() {
  const auth = useContext(AuthContext)

  if (auth?.isLoading) {
    return <p className="mt-2 text-center">Checking your session...</p>
  }

  if (!auth?.user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
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
            <Route element={<ProtectedRoutes />}>
              <Route path="/publish" element={<CreateBlog />} />
              <Route path="/my-blogs" element={<MyBlogs />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App
