import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import te from "./locales/te.json";

const savedLanguage = localStorage.getItem("selectedLanguage") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    te: { translation: te },
  },
  lng: savedLanguage, // Set initial language from localStorage
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
