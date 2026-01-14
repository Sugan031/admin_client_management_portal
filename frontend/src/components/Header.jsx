import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Header() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (e) {
      // ignore error (token might be expired)
    } finally {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <header className="bg-sky-600 px-8 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-semibold text-white">
            Client Management
        </h1>

        <button
            onClick={logout}
            className="bg-white/20 text-white px-4 py-2 rounded-lg
                    hover:bg-white/30 transition"
        >
            Logout
        </button>
    </header>

  );
}
