import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(null)
  const { authIsReady, user } = useAuthContext()

  if (authIsReady && user) {
    user
      .getIdTokenResult()
      .then((idTokenResult) => setIsAdmin(idTokenResult.claims.admin))
  }

  return { isAdmin }
}
