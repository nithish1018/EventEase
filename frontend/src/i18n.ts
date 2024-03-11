import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enJSON from "./locale/en.json";
import spaJSON from "./locale/spa.json";
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        resources: {
            en: { ...enJSON },
            fr: { ...spaJSON },
        },
        fallbackLng: "en",
    });

export default i18n;