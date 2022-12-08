import { createI18n } from "vue-i18n";
import en from "./en";
import kr from "./kr";

const VITE_LOCALE = import.meta.env.VITE_LOCALE;

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: sessionStorage.lang || VITE_LOCALE || "en", // 初始化配置语言
  fallbackLocale: "en",
  messages: {
    en,
    kr,
  },
  //   warnHtmlMessage: false,
});

export default i18n;

export const defaultLocale = VITE_LOCALE;

export const languages = [
  {
    label: "EN",
    value: "en",
    dayjsLocale: "en",
  },
  {
    label: "한국인",
    value: "kr",
    dayjsLocale: "ko",
  },
];
