import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { logout } from "../api/auth";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar
        onLogout={() => {
          logout();
          navigate("/login");
        }}
      />

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr" }}>
        <div style={{ padding: 16, borderRight: "1px solid #ddd", minHeight: "calc(100vh - 50px)" }}>
          <Sidebar />
        </div>

        <div style={{ padding: 16 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
