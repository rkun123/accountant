import { Dayjs } from "dayjs";
import { FC } from "react";
import clsx from "clsx";
import Twemoji from "./lib/Twemoji";

type Props = {
  start: Dayjs;
  end: Dayjs;
  setMonth: (monthDiff: number) => void;
};

const MonthControl: FC<Props> = ({ start, end, setMonth }: Props) => {
  return (
    <div className={clsx("flex", "justify-between", "text-lg")}>
      <div className={clsx("cursor-pointer")} onClick={() => setMonth(-1)}>
        <Twemoji emoji="🤛" />
      </div>
      <div className={clsx("cursor-pointer")} onClick={() => setMonth(1)}>
        <Twemoji emoji="🤜" />
      </div>
    </div>
  );
};

export default MonthControl;
