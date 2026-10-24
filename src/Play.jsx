
import { useState, useRef, useEffect } from 'react'
import '../play.css'

const colors = ['green', 'red', 'yellow', 'blue']

function Play() {
  const [score, setScore] = useState(0)
  const [active, setActive] = useState(null)
  const [message, setMessage] = useState('Press Reset to start')
  const [playing, setPlaying] = useState(false)

  const sequenceRef = useRef([])
  const indexRef = useRef(0)
  const acceptingRef = useRef(false)
  const timersRef = useRef([])

  // Schedule an action and keep track of the timer
  function schedule(callback, delay) {
    const timer = setTimeout(callback, delay)
    timersRef.current.push(timer)
  }

  // Clear existing timers when restarting
  function clearTimers() {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  // Clean up timers when leaving the page
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout)
    }
  }, [])

  // Show the computer's color sequence
  function showSequence(nextSequence) {
    acceptingRef.current = false
    setPlaying(true)
    setActive(null)
    setMessage('Watch the sequence!')

    nextSequence.forEach((color, index) => {
      const startTime = index * 900 + 400

      schedule(() => {
        setActive(color)
      }, startTime)

      schedule(() => {
        setActive(null)
      }, startTime + 500)
    })

    // Wait until the final flash finishes
    schedule(() => {
      acceptingRef.current = true
      setPlaying(false)
      setMessage('Your turn!')
    }, nextSequence.length * 900 + 500)
  }

  // Add a random color for the next round
  function nextRound(currentSequence) {
    const randomColor =
      colors[Math.floor(Math.random() * colors.length)]

    const nextSequence = [...currentSequence, randomColor]

    sequenceRef.current = nextSequence
    indexRef.current = 0

    showSequence(nextSequence)
  }

  // Start a new game
  function resetGame() {
    clearTimers()

    acceptingRef.current = false
    sequenceRef.current = []
    indexRef.current = 0

    setScore(0)
    setActive(null)
    setPlaying(false)
    setMessage('Starting new game...')

    nextRound([])
  }

  // Handle clicks on the colored buttons
  function handleColorClick(color) {
    if (!acceptingRef.current) {
      return
    }

    const currentIndex = indexRef.current

    setActive(color)
    schedule(() => setActive(null), 250)

    // Incorrect color ends the game
    if (color !== sequenceRef.current[currentIndex]) {
      acceptingRef.current = false
      setPlaying(false)
      setMessage('Game Over! Press Reset to try again.')
      return
    }

    const nextIndex = currentIndex + 1
    indexRef.current = nextIndex

    // Player completed the full sequence
    if (nextIndex === sequenceRef.current.length) {
      acceptingRef.current = false

      setScore(sequenceRef.current.length)
      setMessage('Correct! Next round...')

      schedule(() => {
        nextRound(sequenceRef.current)
      }, 1200)
    } else {
      setMessage('Correct! Keep going...')
    }
  }

  return (
    <main className="play-page">
      <div className="players">
        Player:
        <span className="player-name">
          {' '}Mystery player
        </span>
      </div>

      <div className="game">
        <div className="button-container">
          <button
            type="button"
            className={`button-top-left ${
              active === 'green' ? 'lit' : ''
            }`}
            aria-label="Green"
            onClick={() => handleColorClick('green')}
          />

          <button
            type="button"
            className={`button-top-right ${
              active === 'red' ? 'lit' : ''
            }`}
            aria-label="Red"
            onClick={() => handleColorClick('red')}
          />

          <button
            type="button"
            className={`button-bottom-left ${
              active === 'yellow' ? 'lit' : ''
            }`}
            aria-label="Yellow"
            onClick={() => handleColorClick('yellow')}
          />

          <button
            type="button"
            className={`button-bottom-right ${
              active === 'blue' ? 'lit' : ''
            }`}
            aria-label="Blue"
            onClick={() => handleColorClick('blue')}
          />

          <div className="controls center">
            <div className="game-name">
              Simon®
            </div>

            <div className="score center">
              {score}
            </div>

            <button
              type="button"
              className="reset-button"
              onClick={resetGame}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <p className="game-message" role="status">
        {message}
      </p>

      {playing && (
        <p className="game-message">
          Watch carefully and remember the colors.
        </p>
      )}
    </main>
  )
}

export default Play
