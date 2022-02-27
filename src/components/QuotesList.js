import { useState, useEffect, useCallback } from 'react'
import { useAdmin } from '../hooks/useAdmin'
import { useToken } from '../hooks/useToken'

import Trashcan from '../assets/trashcan.svg'

function QuotesList() {
  const [data, setData] = useState(null)
  const { isAdmin } = useAdmin()
  const { token } = useToken()

  const fetchQuotes = useCallback(() => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    if (!token) return

    fetch('https://react-node-on-fire.herokuapp.com/api/quotes', options)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err))
  }, [token])

  useEffect(() => {
    fetchQuotes()
  }, [fetchQuotes])

  const handleClick = (id) => {
    fetch(`https://react-node-on-fire.herokuapp.com/api/quotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
      }),
    })
      .then((response) => {
        if (response.ok) {
          fetchQuotes()
        }
      })
      .catch((err) => console.log(err))
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
