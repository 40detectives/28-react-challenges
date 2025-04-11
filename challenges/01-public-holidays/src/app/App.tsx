import { HolidayList } from "@/features/holiday-list";
import { CountrySelector } from "@/shared/components/country-selector/country-selector";
import { LangSelector } from "@/shared/components/lang-selector/lang-selector";
import Arrow8 from "@/shared/ui/xxx";

function App() {
  // read userlocale --> get countries --> set default country --> set country language (fallback to english)

  return (
    <>
      <LangSelector />
      <CountrySelector />
      <Arrow8 />
      <HolidayList />
    </>
  );
}

export default App;
