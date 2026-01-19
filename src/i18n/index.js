// src/i18n/index.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import fr from './locales/fr.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
};

i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr'],
    
    interpolation: {
      escapeValue: false, // React already escapes by default
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'clinicflow_language',
    },
  });

export default i18n;
