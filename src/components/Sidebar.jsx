import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  display: "block",
  padding: "10px 12px",
  borderRadius: 8,
  textDecoration: "none",
  color: "black",
  background: isActive ? "#f2f2f2" : "transparent",
});

export default function Sidebar() {
  return (
    <aside style={{ width: 220, padding: 16, borderRight: "1px solid #eee" }}>
      <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
        <NavLink to="/patients" style={linkStyle}>Patients</NavLink>
      </nav>
    </aside>
  );
}
