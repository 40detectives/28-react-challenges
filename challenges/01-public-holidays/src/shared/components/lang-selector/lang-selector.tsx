import { useEffect, useState } from "react";
import { getLanguageName } from "@/shared/api/model";
import type { Language } from "@/shared/api/model";
import { useI18nContext } from "@/shared/i18n/i18n";
import { autoSelectLanguage, fetchLanguageList } from "./lang-selector-logic";

export const LangSelector: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const { userLocale, selectedLang, setSelectedLang, selectedCountry } =
    useI18nContext();

  useEffect(() => {
    void fetchLanguageList().then(setLanguages);
  }, []);

  useEffect(() => {
    if (languages.length > 0 && userLocale?.languages) {
      const langCode = autoSelectLanguage(languages, userLocale.languages);
      setSelectedLang(langCode);
    }
  }, [languages, userLocale?.languages, setSelectedLang]);

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const lang = languages.find((l) => l.isoCode === event.target.value);
    setSelectedLang(lang);
  };
  return (
    <>
      <select
        name="lang-selector"
        value={selectedLang?.isoCode}
        onChange={handleChange}
      >
        {languages.map((lang) => (
          <option
            key={lang.isoCode}
            value={lang.isoCode}
            disabled={!selectedCountry?.name[lang.isoCode]}
          >
            {getLanguageName(lang, selectedLang?.isoCode)}
          </option>
        ))}
      </select>
    </>
  );
};
