import { UUID } from "crypto";
import type { Country, Language } from "./model";

export const API = {
  baseUrl: "https://openholidaysapi.org/",
  options: { method: "GET", headers: { accept: "application/json" } },
};

interface APIEndpoint {
  readonly path: string;
  params?: { [name: string]: string };
}

export interface APICountriesEndpoint extends APIEndpoint {
  readonly path: "Countries";
  params?: {
    languageIsoCode?: string;
  };
}

export interface CountryAPIResponse {
  isoCode: string;
  name: {
    language: string;
    text: string;
  }[];
  officialLanguages: string[];
}

export function mapCountry(countryResponse: CountryAPIResponse) {
  const mappedCountry: Country = {
    isoCode: countryResponse.isoCode,
    officialLanguages: countryResponse.officialLanguages.map((ol) =>
      ol.toLowerCase()
    ),
    name: Object.fromEntries(
      countryResponse.name.map((n) => [
        n.language.toLowerCase(),
        n.text.split(" (", 1)[0],
      ])
    ),
  };

  return mappedCountry;
}

export interface APIHolidayEndpoint extends APIEndpoint {
  readonly path: "PublicHolidays" | "SchoolHolidays";
  params: {
    countryIsoCode: string;
    validFrom: string;
    validTo: string;
    languageIsoCode?: string;
    subdivisionCode?: string;
  };
}

export interface APIPublicHolidayResponse {
  id: UUID;
  startDate: string;
  endDate: string;
}

export interface APILanguagesEndpoint extends APIEndpoint {
  readonly path: "Languages";
  params?: {
    languageIsoCode?: string;
  };
}

export function mapLanguage(languageResponse: LanguageAPIResponse) {
  const mappedLanguage: Language = {
    isoCode: languageResponse.isoCode.toLowerCase(),
    name: Object.fromEntries(
      languageResponse.name.map((n) => [
        n.language.toLowerCase(),
        n.text.replace(/(^|\s)[a-z]/gi, (l) => l.toUpperCase()),
      ])
    ),
  };

  return mappedLanguage;
}

export interface LanguageAPIResponse {
  isoCode: string;
  name: {
    language: string;
    text: string;
  }[];
}

export function buildUrlQuery(baseUrl: string, endpoint: APIEndpoint) {
  const finalUrl = new URL(baseUrl);
  finalUrl.pathname = endpoint.path;
  if (endpoint.params) {
    Object.entries(endpoint.params).forEach(([key, value]) => {
      finalUrl.searchParams.append(key, value);
    });
  }

  return finalUrl;
}
