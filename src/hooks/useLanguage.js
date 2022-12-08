import { languages } from "@/locales";
import { useI18n } from "vue-i18n";

export default function useLanguage() {
  const { locale } = useI18n();

  return {
    locale,
    languages,
  };
}
