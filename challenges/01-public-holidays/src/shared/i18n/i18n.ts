import { createContext, useContext } from "react";
import { Country, Language } from "@/shared/api/model";

export interface UserLocale {
  isoCodes: readonly string[]; // typeof navigator.languages
  languages: string[];
  countries: string[];
}

interface I18nContextType {
  userLocale: UserLocale | undefined;
  setUserLocale: (l?: UserLocale) => void;
  selectedCountry: Country | undefined;
  setSelectedCountry: (c?: Country) => void;
  selectedLang: Language | undefined;
  setSelectedLang: (c?: Language) => void;
}

export const I18nContext = createContext<I18nContextType | null>(null);

export const useI18nContext = () => {
  const i18nContex = useContext(I18nContext);

  if (!i18nContex) {
    throw new Error("i18nContex has to be used within <I18nProvider>");
  }

  return i18nContex;
};
