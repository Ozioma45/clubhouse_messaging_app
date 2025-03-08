import { Link, useNavigate } from "react-router-dom";
import { getAuthUser, logout } from "../utils/auth";

function Navbar() {
  const user = getAuthUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Home</Link>

      {user ? (
        <>
          {!user.isMember && <Link to="/join">Join the Club</Link>}
          {!user.isAdmin && <Link to="/become-admin">Become Admin</Link>}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
