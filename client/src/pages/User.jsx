import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { logout } from "../utils/auth";

export default function User() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();           // remove token
    navigate("/login"); // redirect
  };

  return (
    <Layout>
      <h1>User</h1>

      <button
        onClick={handleLogout}
        style={{
          background: "red",
          color: "white",
          padding: "8px 12px",
          borderRadius: "5px",
        }}
      >
        Logout
      </button>
    </Layout>
  );
}