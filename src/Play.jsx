import { useState, useRef, useEffect } from 'react'
import '../play.css'

function Play() {
  const [sequence, setSequence] = useState([])
  const [playerIndex, setPlayerIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [active, setActive] = useState(null)
  const [message, setMessage] = useState('Press Reset to start')
  const [playing, setPlaying] = useState(false)

  const sequenceRef = useRef([])
  const indexRef = useRef(0)
  const acceptingRef = useRef(false)
  const timersRef = useRef([])

  const colors = ['green', 'red', 'yellow', 'blue']

  function schedule(callback, delay) {
    const timer = setTimeout(callback, delay)
    timersRef.current.push(timer)
  }

  function clearTimers() {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout)
    }
  }, [])

  function showSequence(nextSequence) {
    acceptingRef.current = false
    setPlaying(true)
    setMessage('Watch the sequence!')

    nextSequence.forEach((color, index) => {
      schedule(() => setActive(color), index * 800 + 400)
      schedule(() => setActive(null), index * 800 + 850)
    })

    schedule(() => {
      acceptingRef.current = true
      setPlaying(false)
      setMessage('Your turn!')
    }, nextSequence.length * 800 + 500)
  }

  function nextRound(currentSequence) {
    const randomColor =
      colors[Math.floor(Math.random() * colors.length)]

    const nextSequence = [...currentSequence, randomColor]

    sequenceRef.current = nextSequence
    indexRef.current = 0

    setSequence(nextSequence)
    setPlayerIndex(0)

    showSequence(nextSequence)
  }

  function resetGame() {
    clearTimers()
    acceptingRef.current = false
    sequenceRef.current = []
    indexRef.current = 0

    setScore(0)
    setSequence([])
    setPlayerIndex(0)
    setActive(null)

    nextRound([])
  }

  function handleColorClick(color) {
    if (!acceptingRef.current) return

    const currentIndex = indexRef.current

    setActive(color)
    schedule(() => setActive(null), 250)

    if (color !== sequenceRef.current[currentIndex]) {
      acceptingRef.current = false
      setMessage('Game Over! Press Reset to try again.')
      return
    }

    const nextIndex = currentIndex + 1

    indexRef.current = nextIndex
    setPlayerIndex(nextIndex)

    if (nextIndex === sequenceRef.current.length) {
      acceptingRef.current = false

      setScore(sequenceRef.current.length)
      setMessage('Correct! Next round...')

      schedule(() => {
        nextRound(sequenceRef.current)
      }, 1000)
    }
  }

  return (
    <main className="play-page">
      <div className="players">
        Player:
        <span className="player-name"> Mystery player</span>
      </div>

      <div className="game">
        <div className="button-container">
          <button
            className={`button-top-left ${active === 'green' ? 'lit' : ''}`}
            aria-label="Green"
            onClick={() => handleColorClick('green')}
          />

          <button
            className={`button-top-right ${active === 'red' ? 'lit' : ''}`}
            aria-label="Red"
            onClick={() => handleColorClick('red')}
          />

          <button
            className={`button-bottom-left ${active === 'yellow' ? 'lit' : ''}`}
            aria-label="Yellow"
            onClick={() => handleColorClick('yellow')}
          />

          <button
            className={`button-bottom-right ${active === 'blue' ? 'lit' : ''}`}
            aria-label="Blue"
            onClick={() => handleColorClick('blue')}
          />

          <div className="controls center">
            <div className="game-name">Simon®</div>

            <div className="score center">
              {score}
            </div>

            <button className="reset-button" onClick={resetGame}>
              Reset
            </button>
          </div>
        </div>
      </div>

      <p className="game-message">{message}</p>
    </main>
  )
}

export default Play