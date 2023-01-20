import { Link } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const handleClick = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  return (
    <div className="container">
      <div className="title">
        <Link to="/">My Cool Posts</Link>
      </div>
      <nav>
        {user !== null && (
          <div>
            <span>{user.email}</span>
            <button onClick={handleClick}>Log Out</button>
          </div>
        )}
        {user === null && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </nav>
    </div>
  );
}
