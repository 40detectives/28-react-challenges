import type { Country } from "@/shared/api/model";
import type {
  APICountriesEndpoint,
  CountryAPIResponse,
} from "@/shared/api/public-holidays-api";
import {
  buildUrlQuery,
  API,
  mapCountry,
} from "@/shared/api/public-holidays-api";

export function fetchCountryList() {
  const endpoint: APICountriesEndpoint = {
    path: "Countries",
    // params: { languageIsoCode: "EN" },
  };

  const finalUrl = buildUrlQuery(API.baseUrl, endpoint);

  return fetch(finalUrl, API.options)
    .then((res) => res.json())
    .then((data: CountryAPIResponse[]) => {
      const mappedCountries = data.map(mapCountry);
      // console.log(mappedCountries);
      return mappedCountries;
    });
}

export function autoSelectCountry(
  countries: Country[],
  userLocaleCountries: string[]
) {
  const initialCountry = userLocaleCountries.map((preferredCountry) =>
    countries.find((countryInAPI) =>
      countryInAPI.isoCode.includes(preferredCountry)
    )
  )?.[0];
  return initialCountry;
}
