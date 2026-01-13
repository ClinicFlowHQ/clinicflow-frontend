// src/layouts/DashboardLayout.jsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkStyle = ({ isActive }) => ({
    display: "block",
    padding: "10px 12px",
    borderRadius: 8,
    textDecoration: "none",
    color: "#111",
    background: isActive ? "#f0f0f0" : "transparent",
    marginBottom: 6,
  });

  return (
    <div>
      {/* top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 16px",
          borderBottom: "1px solid #eee",
        }}
      >
        <b>ClinicFlowHQ</b>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* body */}
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr" }}>
        <aside style={{ padding: 16, borderRight: "1px solid #eee" }}>
          <NavLink to="/dashboard" style={linkStyle}>
            Dashboard
          </NavLink>
          <NavLink to="/patients" style={linkStyle}>
            Patients
          </NavLink>
        </aside>

        <main style={{ padding: 24 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
