import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useToken = () => {
  const [token, setToken] = useState(null)
  const { authIsReady, user } = useAuthContext()

  if (authIsReady && user) {
    try {
      user.getIdToken().then((token) => setToken(token))
    } catch (err) {
      console.log(err)
    }
  }

  return { token }
}
