import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState(
    "admin@smartrestaurant.com"
  );

  const [password, setPassword] =
    useState("123456");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const loggedUser = await login({
        email,
        password,
      });

      switch (loggedUser.role) {
        case "CASHIER":
          navigate("/pos");
          break;

        case "KITCHEN":
          navigate("/kitchen");
          break;

        case "ADMIN":
        case "MANAGER":
        default:
          navigate("/");
          break;
      }
    } catch (loginError) {
      console.error(
        "Login failed",
        loginError
      );

      setError(
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >
        <h1>Smart Restaurant</h1>

        <p>
          Login to your management dashboard
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <label htmlFor="login-email">
          Email
        </label>

        <input
          id="login-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
        />

        <label htmlFor="login-password">
          Password
        </label>

        <input
          id="login-password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Signing in..."
            : "Login"}
        </button>
      </form>
    </div>
  );
}