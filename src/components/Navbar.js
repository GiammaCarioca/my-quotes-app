import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import { useAdmin } from '../hooks/useAdmin'

import './Navbar.css'

export default function Navbar() {
  const { logout } = useLogout()
  const { isAdmin } = useAdmin()
  const { authIsReady, user } = useAuthContext()

  return (
    <>
      {authIsReady && (
        <nav className='navbar'>
          <ul>
            <li className='logo'>
              <Link to='/'>MyQuotes App</Link>
            </li>

            {!user && (
              <>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
                <li>
                  <Link to='/signup'>Signup</Link>
                </li>
              </>
            )}

            {user && (
              <>
                <li className='display-name'>hello, {user.displayName}</li>

                {isAdmin && (
                  <li>
                    <Link to='/create' className='btn'>
                      Add new quote
                    </Link>
                  </li>
                )}

                <li>
                  <button className='btn' onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </>
  )
}
