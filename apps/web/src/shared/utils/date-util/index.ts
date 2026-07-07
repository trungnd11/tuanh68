export function isCurrentDateInRange(dateRangeLabel: string, currentTimestamp = Date.now()) {
  const dateMatches = [...dateRangeLabel.matchAll(/(\d{2})\/(\d{2})\/(\d{4})/g)];
  const startDateMatch = dateMatches.at(0);
  const endDateMatch = dateMatches.at(-1);

  if (!startDateMatch || !endDateMatch) return false;

  const [, startDay, startMonth, startYear] = startDateMatch;
  const [, endDay, endMonth, endYear] = endDateMatch;
  const rangeStart = new Date(`${startYear}-${startMonth}-${startDay}T08:00:00+07:00`).getTime();
  const rangeEnd = new Date(`${endYear}-${endMonth}-${endDay}T16:00:00+07:00`).getTime();

  if (Number.isNaN(rangeStart) || Number.isNaN(rangeEnd)) return false;

  return currentTimestamp >= rangeStart && currentTimestamp <= rangeEnd;
}
