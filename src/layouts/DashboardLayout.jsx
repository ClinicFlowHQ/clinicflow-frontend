import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

const linkStyle = ({ isActive }) => ({
  display: "block",
  padding: "10px 12px",
  borderRadius: 10,
  textDecoration: "none",
  color: isActive ? "#111" : "#444",
  background: isActive ? "#e9ecef" : "transparent",
  fontWeight: isActive ? 700 : 500,
});

export default function DashboardLayout() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 260,
          padding: 16,
          borderRight: "1px solid #eee",
          background: "#fafafa",
        }}
      >
        <h2 style={{ margin: "6px 0 14px" }}>ClinicFlow</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <NavLink to="/dashboard" style={linkStyle}>
            Dashboard
          </NavLink>

          <NavLink to="/patients" style={linkStyle}>
            Patients
          </NavLink>

          {/* Add later */}
          <NavLink to="/appointments" style={linkStyle}>
            Appointments (soon)
          </NavLink>

          <NavLink to="/visits" style={linkStyle}>
            Visits (soon)
          </NavLink>

          <NavLink to="/prescriptions" style={linkStyle}>
            Prescriptions (soon)
          </NavLink>
        </nav>

        <div style={{ marginTop: 18 }}>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #ddd",
              background: "white",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}
