// src/components/ThemeToggle.jsx
import { useTheme } from "../theme/ThemeProvider";
import { useTranslation } from "react-i18next";

const Icons = {
  Sun: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/>
      <path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/>
      <path d="M2 12h2"/><path d="M20 12h2"/>
      <path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
    </svg>
  ),
  Moon: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
    </svg>
  ),
};

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useTranslation();

  return (
    <button
      onClick={toggle}
      style={{
        width: "100%",
        padding: "12px 14px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.1)",
        background: "transparent",
        color: "var(--sidebar-text)",
        cursor: "pointer",
        fontWeight: 500,
        fontSize: "0.9375rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        transition: "all 150ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--sidebar-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
      title={theme === "dark" ? t("theme.lightMode") : t("theme.darkMode")}
    >
      {theme === "dark" ? <Icons.Sun /> : <Icons.Moon />}
      {theme === "dark" ? t("theme.lightMode") : t("theme.darkMode")}
    </button>
  );
}
