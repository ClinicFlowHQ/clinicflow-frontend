import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ padding: 30 }}>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/dashboard">Go back to dashboard</Link>
    </div>
  );
}
