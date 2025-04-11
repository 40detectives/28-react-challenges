import { Language } from "@/shared/api/model";
import {
  API,
  APILanguagesEndpoint,
  buildUrlQuery,
  LanguageAPIResponse,
  mapLanguage,
} from "../../api/public-holidays-api";

export function fetchLanguageList() {
  const endpoint: APILanguagesEndpoint = {
    path: "Languages",
    // params: { languageIsoCode?: "es" }
  };

  const finalUrl = buildUrlQuery(API.baseUrl, endpoint);

  return fetch(finalUrl, API.options)
    .then((res) => res.json())
    .then((data: LanguageAPIResponse[]) => {
      const mappedLanguages = data.map(mapLanguage);
      // console.log(mappedLanguages);
      return mappedLanguages;
    });
}

export function autoSelectLanguage(
  languages: Language[],
  userLocaleLanguages: string[]
) {
  const fallbackLang = {
    isoCode: "en",
    name: {
      en: "English",
      de: "Englisch",
    },
  };
  const initialLang = userLocaleLanguages.map((preferredLang) =>
    languages.find((langInAPI) => langInAPI.isoCode.includes(preferredLang))
  )?.[0];

  return initialLang || fallbackLang;
}
