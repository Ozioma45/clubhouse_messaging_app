import { useState, useEffect } from "react";
import { getAuthUser } from "../utils/auth";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const [user, setUser] = useState(getAuthUser()); // Track user updates

  // Re-fetch user from localStorage when the component renders
  useEffect(() => {
    setUser(getAuthUser());
  }, [messages]);

  // Fetch messages from backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/messages");
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        console.log(err);
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setNewMessage({ ...newMessage, [e.target.name]: e.target.value });
  };

  // Handle message submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user || !user.isMember) {
      setError("Only members can post messages.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User is not authenticated.");
        return;
      }

      console.log(
        "Token before sending request:",
        localStorage.getItem("token")
      );

      const response = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newMessage),
      });

      if (!response.ok) {
        throw new Error("Failed to post message");
      }

      const newMsg = await response.json();
      setMessages([...messages, newMsg]);

      // Update user in local storage
      const updatedUser = { ...user, isMember: true };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setNewMessage({ title: "", content: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle message deletion (Admin only)
  const handleDelete = async (id) => {
    if (!user || !user.isAdmin) {
      setError("Only admins can delete messages.");
      return;
    }

    try {
      await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: "DELETE",
        headers: { Authorization: localStorage.getItem("token") },
      });

      setMessages(messages.filter((msg) => msg.id !== id));
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  return (
    <div>
      <h2>Clubhouse Messages</h2>

      {/* Show error messages */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Message form (Only for members) */}
      {user?.isMember && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newMessage.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="content"
            placeholder="Write your message..."
            value={newMessage.content}
            onChange={handleChange}
            required
          />
          <button type="submit">Post Message</button>
        </form>
      )}

      {/* Display messages */}
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <h3>{msg.title}</h3>
            <p>{msg.content}</p>
            {user?.isMember && <p>Author: {msg.author_name}</p>}
            {user?.isAdmin && (
              <button onClick={() => handleDelete(msg.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Messages;
