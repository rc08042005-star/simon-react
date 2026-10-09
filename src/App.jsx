import { Routes, Route, NavLink } from 'react-router-dom'

import Home from './Home.jsx'
import Play from './Play.jsx'
import Scores from './Scores.jsx'
import About from './About.jsx'

function App() {
  return (
    <div className="app">
      <header>
        <h1>Simon</h1>

        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/play">Play</NavLink>
          <NavLink to="/scores">Scores</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/scores" element={<Scores />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <footer>
        <p>Simon React | CS 260</p>
      </footer>
    </div>
  )
}

export default App