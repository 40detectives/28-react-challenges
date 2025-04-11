import { useEffect, useState } from "react";
import type { UserLocale } from "./i18n";
import { I18nContext } from "./i18n";
import { Country, Language } from "@/shared/api/model";

interface Props {
  children?: React.ReactNode;
}

export const I18nProvider: React.FC<Props> = ({ children }) => {
  const [userLocale, setUserLocale] = useState<UserLocale>();
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();
  const [selectedLang, setSelectedLang] = useState<Language | undefined>();

  useEffect(() => {
    console.log("[I18nProvider]: get user locale!");
    const [[...lang], [...country]] = navigator.languages.reduce(
      (acc, cur) => {
        const [lang, country] = cur.split("-");
        if (lang) acc[0].add(lang);
        if (country) acc[1].add(country);
        return acc;
      },
      [new Set<string>(), new Set<string>()]
    );
    setUserLocale({
      isoCodes: navigator.languages,
      languages: lang,
      countries: country,
    });
  }, []);

  return (
    <I18nContext.Provider
      value={{
        userLocale,
        setUserLocale,
        selectedCountry,
        setSelectedCountry,
        selectedLang,
        setSelectedLang,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};
