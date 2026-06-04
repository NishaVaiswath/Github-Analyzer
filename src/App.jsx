import { useState } from "react"
import LanguageChart from "./Chart"

function App() {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [repos, setRepos] = useState([])

  const searchUser = async () => {
    const userRes = await fetch(`https://api.github.com/users/${username}`)
    const userData = await userRes.json()
    setUser(userData)

    const repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=30`)
    const repoData = await repoRes.json()
    setRepos(repoData)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold text-center text-blue-400 mb-8">GitHub Analyzer</h1>

      <div className="flex gap-2 justify-center mb-10">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white w-72 focus:outline-none focus:border-blue-400"
        />
        <button
          onClick={searchUser}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition"
        >
          Search
        </button>
      </div>

      {user && (
        <div className="max-w-3xl mx-auto">

          <div className="bg-gray-900 rounded-2xl p-6 flex gap-6 items-center mb-6">
            <img src={user.avatar_url} className="w-24 h-24 rounded-full border-4 border-blue-400" />
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-400">{user.bio}</p>
              <p className="text-gray-400 mt-1">📍 {user.location}</p>
              <div className="flex gap-4 mt-3">
                <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">👥 {user.followers} Followers</span>
                <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">📁 {user.public_repos} Repos</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Top Repositories ⭐</h3>
            {repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5).map(repo =>  (
              <div key={repo.id} className="flex justify-between items-center py-3 border-b border-gray-800 last:border-0">
                <a href={repo.html_url} target="_blank" className="text-blue-300 hover:underline">{repo.name}</a>
                <span className="text-yellow-400 text-sm">⭐ {repo.stargazers_count}</span>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Language Breakdown 📊</h3>
            <LanguageChart repos={repos} />
          </div>

        </div>
      )}
    </div>
  )
}

export default App