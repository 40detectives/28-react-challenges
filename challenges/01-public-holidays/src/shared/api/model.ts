export interface Country {
  isoCode: string;
  officialLanguages: string[];
  name: {
    [language: string]: string;
  };
}

export function getCountryName(country: Country, langCode: string = "en") {
  return country.name[langCode] || country.name["en"];
}

function getCountry(countries: Country[], countryCode: string) {
  return countries.find((country) => country.isoCode === countryCode);
}

export interface Language {
  isoCode: string;
  name: {
    [languageIso: string]: string;
  };
}

export function getLanguageName(language: Language, langCode: string = "en") {
  return language.name[langCode] || language.name["en"];
}
