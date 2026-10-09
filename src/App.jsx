
import { Routes, Route, Link } from 'react-router-dom'

function Home() {
  return (
    <main>
      <h1>Welcome to Simon</h1>
      <form>
        <input type="email" placeholder="your@email.com" />
        <input type="password" placeholder="password" />
        <button type="button">Login</button>
        <button type="button">Create</button>
      </form>
    </main>
  )
}

function Play() {
  return <main><h1>Play Simon</h1></main>
}

function Scores() {
  return <main><h1>Simon Scores</h1></main>
}

function About() {
  return <main><h1>About Simon</h1></main>
}

function App() {
  return (
    <div>
      <header>
        <h1>Simon</h1>
        <nav>
          <Link to="/">Home</Link> |{' '}
          <Link to="/play">Play</Link> |{' '}
          <Link to="/scores">Scores</Link> |{' '}
          <Link to="/about">About</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/scores" element={<Scores />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <footer>
        <p>Simon React</p>
      </footer>
    </div>
  )
}

export default App
