import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import JoinClub from "./pages/JoinClub";
import { getAuthUser, logout } from "./utils/auth";

function App() {
  const user = getAuthUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>

        {user ? (
          <>
            {!user.isMember && <Link to="/join">Join the Club</Link>}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Messages />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<JoinClub />} />
      </Routes>
    </div>
  );
}

export default App;
