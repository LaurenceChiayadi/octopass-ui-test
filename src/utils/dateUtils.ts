import dayjs from "dayjs";

export const convertRawDateToDate = (rawDate: string) => {
  if (!rawDate || rawDate === "") return "-";
  const match = rawDate.match(/\/Date\((\d+)/);
  if (match === null) return "Invalid date format";

  const timestamp = Number(match[1]);
  if (isNaN(timestamp)) return "-";

  // The converted datetime will be in UTC timezone, so might want to add timezone if requested in the requirements.
  return dayjs(timestamp).format("YYYY-MM-DD");
};
