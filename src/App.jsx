
function App() {
  return (
    <div>
      <header>
        <h1>Simon</h1>

        <nav>
          <a href="/">Home</a> |{" "}
          <a href="/play">Play</a> |{" "}
          <a href="/scores">Scores</a> |{" "}
          <a href="/about">About</a>
        </nav>
      </header>

      <main>
        <h1>Welcome to Simon</h1>

        <form>
          <input type="email" placeholder="your@email.com" />
          <input type="password" placeholder="password" />

          <button type="button">Login</button>
          <button type="button">Create</button>
        </form>
      </main>

      <footer>
        <p>Simon React</p>
      </footer>
    </div>
  );
}

export default App;
