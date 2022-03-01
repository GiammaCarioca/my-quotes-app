import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import { useAdmin } from './hooks/useAdmin'

import './App.css'

import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Navbar from './components/Navbar'

function App() {
  const { authIsReady, user } = useAuthContext()
  const { isAdmin } = useAdmin()

  return (
    <div
      className='App'
      style={isAdmin && { backgroundColor: 'var(--bg-color-admin)' }}
    >
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route
                path='/'
                element={user ? <Home /> : <Navigate to='/login' />}
              ></Route>
              <Route
                path='/login'
                element={user ? <Navigate to='/' /> : <Login />}
              ></Route>
              <Route
                path='/signup'
                element={user ? <Navigate to='/' /> : <Signup />}
              ></Route>
              <Route
                path='/create'
                element={isAdmin ? <Create /> : <Navigate to='/' />}
              ></Route>
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  )
}

export default App
