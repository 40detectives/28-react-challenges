import { useId } from "react";
import type { JSX, ReactElement, ReactNode } from "react";

interface Props {
  name: string;
  options: Array<Item>;
}

interface Item {
  key: string;
  value: string;
  icon: string;
}

export const CuteSelect = <T,>({ name, options }: Props<T>): JSX.Element => {
  const selectId = useId();
  return (
    <select name={name} id={selec}>
      {options.map((option) => {
        if (option) {
        }
        <option value="option"></option>;
      })}
    </select>
  );
};

type Props2<T> = {
  active: T;
  list: T[];
  onChange: (tab: T) => void;
};

export const Tabs = <T,>({ active, list, onChange }: Props2<T>): ReactNode => {
  return null;
};
