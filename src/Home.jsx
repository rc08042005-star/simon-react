import { useState } from 'react'

function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  function handleLogin() {
    if (!email || !password) {
      setMessage('Please enter your email and password.')
      return
    }

    setMessage('Login functionality coming soon!')
  }

  function handleCreate() {
    if (!email || !password) {
      setMessage('Please enter your email and password.')
      return
    }

    setMessage('Account creation coming soon!')
  }

  return (
    <main className="home">
      <h1>Welcome to Simon</h1>

      <p>Test your memory with the classic Simon game!</p>

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="form-buttons">
          <button type="button" onClick={handleLogin}>
            Login
          </button>

          <button type="button" onClick={handleCreate}>
            Create
          </button>
        </div>
      </form>

      <p>{message}</p>
    </main>
  )
}

export default Home