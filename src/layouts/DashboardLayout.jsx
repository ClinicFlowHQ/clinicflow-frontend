import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 16,
            borderBottom: "1px solid #eee",
          }}
        >
          <strong>ClinicFlowHQ</strong>
          <button onClick={handleLogout}>Logout</button>
        </header>

        <main style={{ padding: 16 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
