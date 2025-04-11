import type { Country } from "./model";

function _parseUserLanguages(lang: string) {
  return lang.split("-", 1)[0].toUpperCase();
}

function _getFirstOfficialLanguage(country: Country) {
  return country.officialLanguages[0];
}
