export default function Navbar({ onLogout }) {
  return (
    <div
      style={{
        padding: "12px 16px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <b>ClinicFlowHQ</b>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
