import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthUser } from "../utils/auth";

function JoinClub() {
  const [passcode, setPasscode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState(getAuthUser());

  if (!user) {
    return <p>Please log in to join the club.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to join the club.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ passcode }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to Join Club");
      }

      setMessage(data.message);

      // ✅ Update the token with the new membership status
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); // Store updated user
        setUser(data.user); // Update user state
      }

      // ✅ Update user state immediately!
      const updatedUser = { ...user, isMember: true };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <h2>Join the Club</h2>
      <p>Enter the secret passcode to become a member.</p>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter passcode"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          required
        />
        <button type="submit">Join</button>
      </form>
    </div>
  );
}

export default JoinClub;
