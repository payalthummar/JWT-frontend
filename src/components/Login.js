import { useState } from "react";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      setUser(data);
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log in</h3>
      <label for="email">Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label for="password">Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}