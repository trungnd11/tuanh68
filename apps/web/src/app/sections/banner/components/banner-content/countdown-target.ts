export const fallbackCountdownTargetDate = "2026-07-28T23:59:59+07:00";

function createDateTimeString(day: string, month: string, year: string, time: string) {
  return `${year}-${month}-${day}T${time}+07:00`;
}

export function resolveBannerCountdownTargetDate(dateRangeLabel: string, currentTimestamp = Date.now()) {
  const dateMatches = [...dateRangeLabel.matchAll(/(\d{2})\/(\d{2})\/(\d{4})/g)];
  const startDateMatch = dateMatches.at(0);
  const endDateMatch = dateMatches.at(-1);

  if (!startDateMatch || !endDateMatch) {
    return fallbackCountdownTargetDate;
  }

  const [, startDay, startMonth, startYear] = startDateMatch;
  const [, endDay, endMonth, endYear] = endDateMatch;
  const rangeStartTarget = createDateTimeString(startDay, startMonth, startYear, "08:00:00");
  const rangeEndTarget = createDateTimeString(endDay, endMonth, endYear, "16:00:00");
  const rangeStartTimestamp = new Date(rangeStartTarget).getTime();
  const rangeEndTimestamp = new Date(rangeEndTarget).getTime();

  if (Number.isNaN(rangeStartTimestamp) || Number.isNaN(rangeEndTimestamp)) {
    return fallbackCountdownTargetDate;
  }

  if (currentTimestamp < rangeStartTimestamp) {
    return rangeStartTarget;
  }

  return rangeEndTarget;
}
