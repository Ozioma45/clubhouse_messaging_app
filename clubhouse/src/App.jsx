import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import JoinClub from "./pages/JoinClub";
import BecomeAdmin from "./pages/BecomeAdmin";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Messages />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<JoinClub />} />
        <Route path="/become-admin" element={<BecomeAdmin />} />
      </Routes>
    </div>
  );
}

export default App;
