import { useState, useEffect, useCallback } from 'react'
import { useAdmin } from '../hooks/useAdmin'

import Trashcan from '../assets/trashcan.svg'

import { useAuthContext } from '../hooks/useAuthContext'

function QuotesList() {
  const [data, setData] = useState(null)
  const [token, setToken] = useState(null)

  const { isAdmin } = useAdmin()
  const { user } = useAuthContext()

  user.getIdToken().then((token) => setToken(token))

  const fetchQuotes = useCallback(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    if (!token) return

    fetch('http://localhost:3001/api/quotes', options, { mode: 'cors' })
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [token])

  useEffect(() => {
    fetchQuotes()
  }, [fetchQuotes])

  const handleClick = (id) => {
    fetch(`http://localhost:3001/api/quotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
      }),
    }).then((response) => {
      if (response.ok) {
        fetchQuotes()
      }
    })
  }

  if (data && data.length === 0) {
    return <div className='error'>No quotes to load...</div>
  }

  return (
    <>
      {!data && <p>'Loading...'</p>}
      {data && (
        <ul>
          {data.map((quote) => (
            <li key={quote.id}>
              {quote.text} -{quote.author}{' '}
              {isAdmin && (
                <img
                  className='delete'
                  onClick={() => handleClick(quote.id)}
                  src={Trashcan}
                  alt='delete icon'
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default QuotesList
