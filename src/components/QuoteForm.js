import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

import './QuoteForm.css'

export default function QuoteForm() {
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')
  const [token, setToken] = useState(null)

  const { user } = useAuthContext()

  user.getIdToken().then((token) => setToken(token))

  const handleSubmit = (e) => {
    e.preventDefault()

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        author,
        text,
      }),
    }

    if (!token) return

    fetch('/api/quotes/create', requestOptions).then((response) => {
      if (response.status === 200) {
        window.location.href = '/'
      } else {
        alert(response.message)
      }
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='quote-form'>
        <label>
          <span>Author:</span>
          <input
            type='text'
            required
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
        </label>
        <label>
          <span>Quote:</span>
          <input
            className='quote-area'
            type='textarea'
            required
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </label>
        <button className='btn'>Add Quote</button>
      </form>
    </>
  )
}
