// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getProfile, updateProfile, changePassword } from "../api/profile";

// Role badge colors
const roleColors = {
  admin: { bg: "rgba(239, 68, 68, 0.1)", color: "#ef4444", border: "rgba(239, 68, 68, 0.2)" },
  doctor: { bg: "rgba(59, 130, 246, 0.1)", color: "#3b82f6", border: "rgba(59, 130, 246, 0.2)" },
  nurse: { bg: "rgba(16, 185, 129, 0.1)", color: "#10b981", border: "rgba(16, 185, 129, 0.2)" },
};

// Icons
const Icons = {
  User: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Mail: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  Phone: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  Building: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>
    </svg>
  ),
  Badge: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
    </svg>
  ),
  Stethoscope: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  Lock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Edit: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>
    </svg>
  ),
};

export default function Profile() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    specialization: "",
    license_number: "",
    department: "",
    bio: "",
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  async function loadProfile() {
    setLoading(true);
    setError("");
    try {
      const data = await getProfile();
      setUser(data);
      setFormData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        phone: data.profile?.phone || "",
        specialization: data.profile?.specialization || "",
        license_number: data.profile?.license_number || "",
        department: data.profile?.department || "",
        bio: data.profile?.bio || "",
      });
    } catch (err) {
      console.error("Failed to load profile:", err);
      setError(t("profile.loadError"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  async function handleSaveProfile(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const data = await updateProfile(formData);
      setUser(data);
      setEditMode(false);
      setSuccess(t("profile.updateSuccess"));
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError(err?.response?.data?.detail || t("profile.updateError"));
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await changePassword(passwordData);
      setShowPasswordForm(false);
      setPasswordData({ current_password: "", new_password: "", confirm_password: "" });
      setSuccess(t("profile.passwordSuccess"));
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Failed to change password:", err);
      const errorMsg = err?.response?.data?.current_password?.[0] ||
        err?.response?.data?.confirm_password?.[0] ||
        err?.response?.data?.new_password?.[0] ||
        err?.response?.data?.detail ||
        t("profile.passwordError");
      setError(errorMsg);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="cf-animate-in" style={{ padding: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="cf-skeleton" style={{ height: 32, width: 150 }} />
          <div className="cf-skeleton" style={{ height: 200, borderRadius: 16 }} />
          <div className="cf-skeleton" style={{ height: 300, borderRadius: 16 }} />
        </div>
      </div>
    );
  }

  const role = user?.profile?.role || "nurse";
  const roleStyle = roleColors[role] || roleColors.nurse;

  return (
    <div className="cf-animate-in" style={{ padding: 24, maxWidth: 900 }}>
      <h1 style={{ marginBottom: 24, color: "var(--text)" }}>{t("profile.title")}</h1>

      {/* Messages */}
      {error && (
        <div style={{
          marginBottom: 16,
          padding: "12px 16px",
          borderRadius: "var(--radius)",
          background: "rgba(239, 68, 68, 0.1)",
          border: "1px solid rgba(239, 68, 68, 0.2)",
          color: "#ef4444",
          fontSize: "0.875rem",
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          marginBottom: 16,
          padding: "12px 16px",
          borderRadius: "var(--radius)",
          background: "rgba(16, 185, 129, 0.1)",
          border: "1px solid rgba(16, 185, 129, 0.2)",
          color: "#10b981",
          fontSize: "0.875rem",
        }}>
          {success}
        </div>
      )}

      {/* Profile Header Card */}
      <div style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
        display: "flex",
        alignItems: "center",
        gap: 20,
      }}>
        {/* Avatar */}
        <div style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: roleStyle.bg,
          border: `2px solid ${roleStyle.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: roleStyle.color,
          flexShrink: 0,
        }}>
          <Icons.User />
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, color: "var(--text)", fontSize: "1.5rem" }}>
            {user?.full_name || user?.username}
          </h2>
          <p style={{ margin: "4px 0 12px", color: "var(--muted)", fontSize: "0.9375rem" }}>
            @{user?.username}
          </p>

          {/* Role Badge */}
          <span style={{
            display: "inline-block",
            padding: "6px 12px",
            borderRadius: 20,
            background: roleStyle.bg,
            border: `1px solid ${roleStyle.border}`,
            color: roleStyle.color,
            fontSize: "0.8125rem",
            fontWeight: 600,
            textTransform: "capitalize",
          }}>
            {user?.profile?.role_display || role}
          </span>
        </div>

        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            style={{
              padding: "10px 16px",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
              background: "var(--card)",
              color: "var(--accent)",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "all 150ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--accent)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--card)";
              e.currentTarget.style.color = "var(--accent)";
            }}
          >
            <Icons.Edit />
            {t("profile.editProfile")}
          </button>
        )}
      </div>

      {/* Profile Details / Edit Form */}
      <div style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
      }}>
        <h3 style={{ margin: "0 0 20px", color: "var(--text)", fontSize: "1.125rem" }}>
          {editMode ? t("profile.editInfo") : t("profile.personalInfo")}
        </h3>

        {editMode ? (
          <form onSubmit={handleSaveProfile}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={labelStyle}>{t("profile.firstName")}</label>
                <input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  style={inputStyle}
                  placeholder={t("profile.firstName")}
                />
              </div>
              <div>
                <label style={labelStyle}>{t("profile.lastName")}</label>
                <input
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  style={inputStyle}
                  placeholder={t("profile.lastName")}
                />
              </div>
              <div>
                <label style={labelStyle}>{t("profile.email")}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={inputStyle}
                  placeholder={t("profile.email")}
                />
              </div>
              <div>
                <label style={labelStyle}>{t("profile.phone")}</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={inputStyle}
                  placeholder={t("profile.phone")}
                />
              </div>
              <div>
                <label style={labelStyle}>{t("profile.department")}</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  style={inputStyle}
                  placeholder={t("profile.department")}
                />
              </div>
              {(role === "doctor" || role === "nurse") && (
                <>
                  <div>
                    <label style={labelStyle}>{t("profile.specialization")}</label>
                    <input
                      type="text"
                      value={formData.specialization}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                      style={inputStyle}
                      placeholder={t("profile.specializationPlaceholder")}
                    />
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>{t("profile.licenseNumber")}</label>
                    <input
                      type="text"
                      value={formData.license_number}
                      onChange={(e) => setFormData({ ...formData, license_number: e.target.value })}
                      style={inputStyle}
                      placeholder={t("profile.licenseNumber")}
                    />
                  </div>
                </>
              )}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>{t("profile.bio")}</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
                  placeholder={t("profile.bioPlaceholder")}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <button
                type="submit"
                disabled={saving}
                style={{
                  padding: "10px 20px",
                  borderRadius: "var(--radius)",
                  border: "none",
                  background: "var(--accent)",
                  color: "white",
                  cursor: saving ? "not-allowed" : "pointer",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  opacity: saving ? 0.7 : 1,
                }}
              >
                {saving ? t("common.saving") : t("common.save")}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  // Reset form data
                  setFormData({
                    first_name: user?.first_name || "",
                    last_name: user?.last_name || "",
                    email: user?.email || "",
                    phone: user?.profile?.phone || "",
                    specialization: user?.profile?.specialization || "",
                    license_number: user?.profile?.license_number || "",
                    department: user?.profile?.department || "",
                    bio: user?.profile?.bio || "",
                  });
                }}
                style={{
                  padding: "10px 20px",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                  color: "var(--text)",
                  cursor: "pointer",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                }}
              >
                {t("common.cancel")}
              </button>
            </div>
          </form>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <InfoItem icon={<Icons.Mail />} label={t("profile.email")} value={user?.email || "-"} />
            <InfoItem icon={<Icons.Phone />} label={t("profile.phone")} value={user?.profile?.phone || "-"} />
            <InfoItem icon={<Icons.Building />} label={t("profile.department")} value={user?.profile?.department || "-"} />
            {(role === "doctor" || role === "nurse") && (
              <>
                <InfoItem icon={<Icons.Stethoscope />} label={t("profile.specialization")} value={user?.profile?.specialization || "-"} />
                <InfoItem icon={<Icons.Badge />} label={t("profile.licenseNumber")} value={user?.profile?.license_number || "-"} />
              </>
            )}
            <InfoItem icon={<Icons.Calendar />} label={t("profile.memberSince")} value={formatDate(user?.date_joined)} />
            {user?.profile?.bio && (
              <div style={{ gridColumn: "1 / -1" }}>
                <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.8125rem", marginBottom: 4 }}>
                  {t("profile.bio")}
                </p>
                <p style={{ margin: 0, color: "var(--text)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                  {user.profile.bio}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Security Section */}
      <div style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: 24,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ color: "var(--accent)" }}>
            <Icons.Lock />
          </div>
          <h3 style={{ margin: 0, color: "var(--text)", fontSize: "1.125rem" }}>
            {t("profile.security")}
          </h3>
        </div>

        {showPasswordForm ? (
          <form onSubmit={handleChangePassword}>
            <div style={{ display: "grid", gap: 16, maxWidth: 400 }}>
              <div>
                <label style={labelStyle}>{t("profile.currentPassword")}</label>
                <input
                  type="password"
                  value={passwordData.current_password}
                  onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>
              <div>
                <label style={labelStyle}>{t("profile.newPassword")}</label>
                <input
                  type="password"
                  value={passwordData.new_password}
                  onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                  style={inputStyle}
                  required
                  minLength={8}
                />
              </div>
              <div>
                <label style={labelStyle}>{t("profile.confirmPassword")}</label>
                <input
                  type="password"
                  value={passwordData.confirm_password}
                  onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <button
                type="submit"
                disabled={saving}
                style={{
                  padding: "10px 20px",
                  borderRadius: "var(--radius)",
                  border: "none",
                  background: "var(--accent)",
                  color: "white",
                  cursor: saving ? "not-allowed" : "pointer",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  opacity: saving ? 0.7 : 1,
                }}
              >
                {saving ? t("common.saving") : t("profile.changePassword")}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPasswordForm(false);
                  setPasswordData({ current_password: "", new_password: "", confirm_password: "" });
                  setError("");
                }}
                style={{
                  padding: "10px 20px",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                  color: "var(--text)",
                  cursor: "pointer",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                }}
              >
                {t("common.cancel")}
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowPasswordForm(true)}
            style={{
              padding: "10px 16px",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
              background: "var(--card)",
              color: "var(--text)",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: "0.875rem",
              transition: "all 150ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--bg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--card)";
            }}
          >
            {t("profile.changePassword")}
          </button>
        )}
      </div>
    </div>
  );
}

// Helper component for info items
function InfoItem({ icon, label, value }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
      <div style={{ color: "var(--muted)", marginTop: 2 }}>{icon}</div>
      <div>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.8125rem" }}>{label}</p>
        <p style={{ margin: "2px 0 0", color: "var(--text)", fontSize: "0.9375rem", fontWeight: 500 }}>{value}</p>
      </div>
    </div>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "-";
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

const labelStyle = {
  display: "block",
  marginBottom: 6,
  fontSize: "0.875rem",
  fontWeight: 500,
  color: "var(--text)",
};

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "var(--radius)",
  border: "1px solid var(--border)",
  background: "var(--inputBg)",
  color: "var(--inputText)",
  fontSize: "0.9375rem",
  outline: "none",
  transition: "border-color 150ms ease",
  boxSizing: "border-box",
};
