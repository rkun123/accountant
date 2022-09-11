import dayjs from "dayjs";
import { useMemo, useState } from "react";

export default function () {
  const [month, _setMonth] = useState(dayjs().startOf("month"));
  const nextMonth = useMemo(() => month.add(1, "month"), [month]);

  const setMonth = (monthDiff: number) => {
    _setMonth(month.add(monthDiff, 'month'))
  }

  return {
    month,
    nextMonth,
    setMonth
  };
}
