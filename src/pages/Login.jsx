// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { login } from "../api/auth";
import LanguageSwitcher from "../components/LanguageSwitcher";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.non_field_errors?.[0] ||
        err?.message ||
        t("auth.loginFailed");
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Language Switcher */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <LanguageSwitcher variant="light" />
        </div>

        <div className="login-header">
          <img
            src="/logo.png"
            alt="ClinicFlowHQ"
            className="login-logo"
            draggable="false"
          />
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="field">
            <label className="label">{t("auth.username")}</label>
            <input
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              placeholder={t("auth.enterUsername")}
            />
          </div>

          <div className="field">
            <label className="label">{t("auth.password")}</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder={t("auth.enterPassword")}
            />
          </div>

          {error ? <div className="error">{error}</div> : null}

          <button className="btn" disabled={loading}>
            {loading ? t("auth.loggingIn") : t("auth.login")}
          </button>
        </form>

        <div className="footer">© {new Date().getFullYear()} ClinicFlowHQ</div>
      </div>
    </div>
  );
}
