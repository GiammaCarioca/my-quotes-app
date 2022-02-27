import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
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
            <Switch>
              <Route exact path='/'>
                {!user && <Redirect to='/login' />}
                {user && <Home />}
              </Route>
              <Route path='/login'>
                {user && <Redirect to='/' />}
                {!user && <Login />}
              </Route>
              <Route path='/signup'>
                {user && user.displayName && <Redirect to='/' />}
                {!user && <Signup />}
              </Route>
              <Route path='/create'>
                {!isAdmin && <Redirect to='/' />}
                {isAdmin && <Create />}
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      )}
    </div>
  )
}

export default App
