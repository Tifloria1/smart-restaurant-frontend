import { Link } from "react-router-dom";

export function UnauthorizedPage() {
  return (
    <div className="unauthorized-page">
      <h2>Access denied</h2>
      <p>You do not have permission to access this page.</p>
      <Link to="/">Go back</Link>
    </div>
  );
}