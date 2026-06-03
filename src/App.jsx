import { useState } from "react"

function App() {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [repos, setRepos] = useState([])

  const searchUser = async () => {
    const userRes = await fetch(`https://api.github.com/users/${username}`)
    const userData = await userRes.json()
    setUser(userData)

    const repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=5`)
    const repoData = await repoRes.json()
    setRepos(repoData)
  }

  return (
    <div>
      <h1>GitHub Analyzer</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={searchUser}>Search</button>

      {user && (
        <div>
          <img src={user.avatar_url} width="100" />
          <h2>{user.name}</h2>
          <p>Followers: {user.followers}</p>
          <p>Repos: {user.public_repos}</p>
          <p>Location: {user.location}</p>

          <h3>Top Repos</h3>
          {repos.map(repo => (
            <div key={repo.id}>
              <a href={repo.html_url} target="_blank">{repo.name}</a>
              <span> ⭐ {repo.stargazers_count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App