import type { Country } from "@/shared/api/model";
import { getCountryName } from "@/shared/api/model";
import { useEffect, useState, type ChangeEvent } from "react";
import { autoSelectCountry, fetchCountryList } from "./country-selector-logic";
import { useI18nContext } from "@/shared/i18n/i18n";

export const CountrySelector: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const { userLocale, selectedCountry, setSelectedCountry, selectedLang } =
    useI18nContext();

  useEffect(() => {
    // console.log("[useCountryList effect 0]: ask countries to API!");
    void fetchCountryList().then(setCountries);
  }, []);

  useEffect(() => {
    // console.log("[useCountryList effect 1]: auto select country!");
    if (countries.length > 0 && userLocale?.countries) {
      const country = autoSelectCountry(countries, userLocale.countries);
      setSelectedCountry(country);
    }
  }, [countries, userLocale?.countries, setSelectedCountry]);

  const handleSelectOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log("[setSelectedCountry] en el evento");
    const country = countries.find((c) => c.isoCode === event.target.value);
    setSelectedCountry(country);
  };

  return (
    <>
      <select
        name="countries"
        id="country-selector"
        disabled={countries.length < 1}
        value={selectedCountry?.isoCode}
        onChange={handleSelectOnChange}
      >
        {countries.length < 1 ? (
          <option>Loading...</option>
        ) : (
          <option disabled selected value="">
            (Select a Country)
          </option>
        )}

        {countries.map((country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {getCountryName(country, selectedLang?.isoCode)}
          </option>
        ))}
      </select>
    </>
  );
};
