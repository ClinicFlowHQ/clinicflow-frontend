// src/components/LanguageSwitcher.jsx
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'EN', fullName: 'English' },
  { code: 'fr', label: 'FR', fullName: 'Français' },
];

export default function LanguageSwitcher({ variant = 'default' }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.substring(0, 2) || 'en';

  const handleChange = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  // Variant styles
  const containerStyle = variant === 'light' 
    ? { display: 'flex', gap: 4, padding: '4px', background: 'var(--surface)', borderRadius: 8, border: '1px solid var(--border)' }
    : { display: 'flex', gap: 4, padding: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: 8 };

  const getButtonStyle = (isActive) => {
    if (variant === 'light') {
      return {
        padding: '6px 12px',
        borderRadius: 6,
        border: 'none',
        background: isActive ? 'var(--accent)' : 'transparent',
        color: isActive ? 'white' : 'var(--text)',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: '0.8125rem',
        transition: 'all 150ms ease',
      };
    }
    return {
      padding: '6px 12px',
      borderRadius: 6,
      border: 'none',
      background: isActive ? 'var(--accent)' : 'transparent',
      color: isActive ? 'white' : 'var(--sidebar-text)',
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: '0.8125rem',
      transition: 'all 150ms ease',
    };
  };

  return (
    <div style={containerStyle}>
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => handleChange(code)}
          title={code === 'en' ? 'English' : 'Français'}
          style={getButtonStyle(currentLang === code)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
