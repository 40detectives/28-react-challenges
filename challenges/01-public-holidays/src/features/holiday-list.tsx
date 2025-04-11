import React, { useEffect, useState } from "react";
import type { APIHolidayEndpoint } from "@/shared/api/public-holidays-api";
import { API, buildUrlQuery } from "@/shared/api/public-holidays-api";
import { useI18nContext } from "@/shared/i18n/i18n";

export const HolidayList: React.FC = () => {
  const { selectedCountry, selectedLang } = useI18nContext();
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    if (!selectedCountry) return;
    const { validFrom, validTo } = getCurrentYearInterval();
    const endpoint: APIHolidayEndpoint = {
      path: "PublicHolidays",
      params: {
        countryIsoCode: selectedCountry.isoCode,
        validFrom,
        validTo,
        languageIsoCode: selectedLang?.isoCode,
      },
    };

    const finalUrl = buildUrlQuery(API.baseUrl, endpoint);

    void fetch(finalUrl, API.options)
      .then((res) => res.json())
      .then((data: []) => {
        console.log(
          `The holidays for ${
            selectedCountry.name[selectedLang?.isoCode || "en"]
          } are:`
        );
        console.log(data);
        setHolidays(data);
      });
  }, [selectedCountry, selectedLang]);

  return (
    <dl>
      {holidays.map((h) => {
        return (
          <React.Fragment key={h.id}>
            <dt>{h.startDate}</dt>
            <dd>{h.name[0].text}</dd>
          </React.Fragment>
        );
      })}
    </dl>
  );
};

function getCurrentYearInterval(): { validFrom: string; validTo: string } {
  const currentYear = new Date().getFullYear();

  // using Date.UTC() inside constructor to not get the local offset
  // from my timezone (e.g.: +0100) which could change the final date to a previous/next day
  const startDate = new Date(Date.UTC(currentYear, 0, 1))
    .toISOString()
    .split("T", 1)[0];
  const endDate = new Date(Date.UTC(currentYear, 11, 31))
    .toISOString()
    .split("T", 1)[0];

  // console.log({ startDate, endDate });

  return { validFrom: startDate, validTo: endDate };
}

/*
{
    "id": "aa6a600b-2b16-4250-a41f-f71cdebe7a16",
    "startDate": "2023-01-01",
    "endDate": "2023-01-01",
    "type": "Public",
    "name": [
      {
        "language": "DE",
        "text": "Neujahr"
      }
    ],
    "regionalScope": "National",
    "temporalScope": "FullDay",
    "nationwide": true
  }
*/
