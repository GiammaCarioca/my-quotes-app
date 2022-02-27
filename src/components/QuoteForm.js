import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useToken } from '../hooks/useToken'

import './QuoteForm.css'

export default function QuoteForm() {
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')
  const { token } = useToken()

  const history = useHistory()

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

    fetch(
      'https://react-node-on-fire.herokuapp.com/api/quotes/create',
      requestOptions
    )
      .then((response) => {
        if (response.status === 201) {
          history.push('/')
        }
      })
      .catch((err) => console.log(err))
  }

  return (
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
  )
}
