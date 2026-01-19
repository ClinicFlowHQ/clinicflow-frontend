import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Icons for dashboard cards
const Icons = {
  Patients: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Visits: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  Prescriptions: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  ),
  Appointments: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  Arrow: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  ),
};

function ModuleCard({ title, description, to, Icon, color, bgColor, openText }) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: "inherit",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        background: "var(--card)",
        transition: "all 200ms ease",
        boxShadow: "var(--shadow-sm)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "var(--shadow-lg)";
        e.currentTarget.style.borderColor = color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: bgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
          color: color,
        }}
      >
        <Icon />
      </div>

      <h3 style={{ 
        margin: "0 0 8px", 
        fontSize: "1.125rem",
        fontWeight: 600,
        color: "var(--text)"
      }}>
        {title}
      </h3>

      <p style={{ 
        margin: 0, 
        color: "var(--muted)", 
        fontSize: "0.875rem",
        lineHeight: 1.5,
        flex: 1
      }}>
        {description}
      </p>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginTop: 16,
        color: color,
        fontSize: "0.875rem",
        fontWeight: 500,
      }}>
        {openText}
        <Icons.Arrow />
      </div>
    </Link>
  );
}

export default function Dashboard() {
  const { t } = useTranslation();

  const modules = [
    {
      title: t("nav.patients"),
      description: t("dashboard.patientsDesc"),
      to: "/patients",
      Icon: Icons.Patients,
      color: "#3b82f6",
      bgColor: "rgba(59, 130, 246, 0.1)",
    },
    {
      title: t("nav.visits"),
      description: t("dashboard.visitsDesc"),
      to: "/visits",
      Icon: Icons.Visits,
      color: "#10b981",
      bgColor: "rgba(16, 185, 129, 0.1)",
    },
    {
      title: t("nav.prescriptions"),
      description: t("dashboard.prescriptionsDesc"),
      to: "/prescriptions",
      Icon: Icons.Prescriptions,
      color: "#8b5cf6",
      bgColor: "rgba(139, 92, 246, 0.1)",
    },
    {
      title: t("nav.appointments"),
      description: t("dashboard.appointmentsDesc"),
      to: "/appointments",
      Icon: Icons.Appointments,
      color: "#f59e0b",
      bgColor: "rgba(245, 158, 11, 0.1)",
    },
  ];

  return (
    <div className="cf-animate-in">
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ marginBottom: 8 }}>{t("dashboard.welcomeBack")}</h1>
        <p style={{ color: "var(--muted)", fontSize: "1rem" }}>
          {t("dashboard.selectModule")}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {modules.map((module) => (
          <ModuleCard key={module.to} {...module} openText={t("dashboard.openModule")} />
        ))}
      </div>

      <div style={{ 
        marginTop: 40, 
        padding: 24,
        background: "var(--card)",
        borderRadius: 16,
        border: "1px solid var(--border)"
      }}>
        <h3 style={{ marginBottom: 16, fontSize: "1rem", fontWeight: 600 }}>
          {t("dashboard.quickOverview")}
        </h3>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem" }}>
          {t("dashboard.statsPlaceholder")}
        </p>
      </div>
    </div>
  );
}
