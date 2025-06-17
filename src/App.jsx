import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setUserData(null);

    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then((data) => setUserData(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="app">
      <div className="card">
        <h1>🔍 GitHub User Finder</h1>

        <div className="form-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {loading && <p className="info">⏳ Loading...</p>}
        {error && <p className="error">❌ {error}</p>}

        {userData && (
          <div className="user-card">
            <img src={userData.avatar_url} alt={userData.name} />
            <h2>{userData.name || "No Name Provided"}</h2>
            <p className="username">@{userData.login}</p>
            <p>👥 Followers: {userData.followers}</p>
            <p>📦 Public Repos: {userData.public_repos}</p>
            {userData.bio && <p className="bio">“{userData.bio}”</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
