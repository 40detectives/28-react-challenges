const countryToActualFlag = (lang: string): string => {
  const dict: { [key: string]: string } = {
    es: "es-civil",
  };
  return dict[lang] ?? lang;
};

const Flag = ({
  countryCode,
  ratio,
}: {
  countryCode: string;
  ratio: "1x1" | "4x3";
}) => {
  return (
    <img
      src={`/flags/ratio/${countryCode}.svg`}
      alt={`${countryCode} flag`}
      width={32}
      height={32}
    />
  );
};

export default Flag;
