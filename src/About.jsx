import '../about.css'

function About() {
  return (
    <main className="about-page">
      <h1>About Simon</h1>

      <div className="about-content">
        <p>
          Simon is a classic memory game that challenges
          players to remember and repeat a sequence of colors.
        </p>

        <h2>How to Play</h2>

        <p>
          Simon will show you a sequence of colors.
          Your goal is to repeat the sequence in the
          correct order.
        </p>

        <p>
          Each successful round adds another color,
          making the game more challenging.
        </p>

        <h2>About This Project</h2>

        <p>
          This application was created using React,
          JavaScript, HTML, and CSS for BYU CS 260
          Web Programming.
        </p>

        <p>
          Enjoy playing Simon!
        </p>
      </div>
    </main>
  )
}

export default About