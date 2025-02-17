import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthUser } from "../utils/auth";

function JoinClub() {
  const [passcode, setPasscode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const user = getAuthUser();

  if (!user) {
    return <p>Please log in to join the club.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ passcode }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      setMessage(data.message);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <h2>Join the Club</h2>
      <p>Enter the secret passcode to become a member.</p>
      {message && <p>{message}</p>}
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
