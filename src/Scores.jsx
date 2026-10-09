import '../scores.css'

function Scores() {
  const scores = [
    { name: 'Linus', score: 377, date: 'May 20, 2024' },
    { name: 'Charlie', score: 300, date: 'May 19, 2024' },
    { name: 'Lucy', score: 250, date: 'May 18, 2024' },
    { name: 'Snoopy', score: 200, date: 'May 17, 2024' },
    { name: 'Schroeder', score: 150, date: 'May 16, 2024' }
  ]

  return (
    <main className="scores-page">
      <h1>Simon Scores</h1>

      <p>Top players and their scores</p>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {scores.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
              <td>{player.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default Scores