import dayjs from "dayjs";

export function firstOfMonth(datetime: string) {
  const now = dayjs(datetime);
  return now.startOf("month");
}

export function endOfMonth(datetime: string) {
  const now = dayjs(datetime);
  return now.endOf("month");
}
