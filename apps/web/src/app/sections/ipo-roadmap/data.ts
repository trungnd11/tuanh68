export interface IpoRoadmapItem {
  titleKey: string;
  dateLabelKey: string;
  dateRange: string;
  isActive: boolean;
  isSuccess: boolean;
}

type IpoRoadmapItemBase = Omit<IpoRoadmapItem, "isActive" | "isSuccess">;
const IPO_ROADMAP_YEAR = 2026;

function createDate(year: number, month: number, day: number) {
  return new Date(year, month - 1, day);
}

function getLastDayOfMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function getQuarterStartMonth(quarter: number) {
  return quarter * 3 - 2;
}

function normalizeDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function parseDateRange(dateRange: string) {
  const normalizedRange = dateRange.replace(/\s+/g, " ").trim();

  const singleDayMatch = normalizedRange.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (singleDayMatch) {
    const [, dayRaw, monthRaw, yearRaw] = singleDayMatch;
    const day = Number(dayRaw);
    const month = Number(monthRaw);
    const year = Number(yearRaw);

    return {
      startDate: createDate(year, month, day),
      endDate: createDate(year, month, day),
    };
  }

  const withinMonthMatch = normalizedRange.match(/^Trong tháng (\d{2})\/(\d{4})$/);

  if (withinMonthMatch) {
    const [, monthRaw, yearRaw] = withinMonthMatch;
    const month = Number(monthRaw);
    const year = Number(yearRaw);

    return {
      startDate: createDate(year, month, 1),
      endDate: createDate(year, month, getLastDayOfMonth(year, month)),
    };
  }

  const startOfMonthMatch = normalizedRange.match(/^Dự kiến đầu tháng (\d{2})\/(\d{4})$/);

  if (startOfMonthMatch) {
    const [, monthRaw, yearRaw] = startOfMonthMatch;
    const month = Number(monthRaw);
    const year = Number(yearRaw);

    return {
      startDate: createDate(year, month, 1),
      endDate: createDate(year, month, 10),
    };
  }

  const estimatedMonthMatch = normalizedRange.match(/^Dự kiến tháng (\d{2})\/(\d{4})$/);

  const estimatedMonthTFormatMatch = normalizedRange.match(/^Dự kiến trong T(\d{1,2})\/(\d{4})$/);

  if (estimatedMonthTFormatMatch) {
    const [, monthRaw, yearRaw] = estimatedMonthTFormatMatch;
    const month = Number(monthRaw);
    const year = Number(yearRaw);

    return {
      startDate: createDate(year, month, 1),
      endDate: createDate(year, month, getLastDayOfMonth(year, month)),
    };
  }

  if (estimatedMonthMatch) {
    const [, monthRaw, yearRaw] = estimatedMonthMatch;
    const month = Number(monthRaw);
    const year = Number(yearRaw);

    return {
      startDate: createDate(year, month, 1),
      endDate: createDate(year, month, getLastDayOfMonth(year, month)),
    };
  }

  const estimatedQuarterMatch = normalizedRange.match(/^Dự kiến Q([1-4]) (\d{4})$/);

  if (estimatedQuarterMatch) {
    const [, quarterRaw, yearRaw] = estimatedQuarterMatch;
    const quarter = Number(quarterRaw);
    const year = Number(yearRaw);
    const startMonth = getQuarterStartMonth(quarter);
    const endMonth = startMonth + 2;

    return {
      startDate: createDate(year, startMonth, 1),
      endDate: createDate(year, endMonth, getLastDayOfMonth(year, endMonth)),
    };
  }

  const [startRaw, endRaw] = normalizedRange.split(" - ").map((value) => value.trim());

  if (!startRaw || !endRaw) {
    return null;
  }

  const startParts = startRaw.split("/");
  const endParts = endRaw.split("/");

  if (endParts.length !== 2 && endParts.length !== 3) {
    return null;
  }

  const [endDay, endMonth] = endParts.slice(0, 2).map(Number);
  const endYear = endParts.length === 3 ? Number(endParts[2]) : IPO_ROADMAP_YEAR;

  if ([endDay, endMonth, endYear].some(Number.isNaN)) {
    return null;
  }

  let startDay: number;
  let startMonth: number;
  let startYear: number;

  if (startParts.length === 1) {
    startDay = Number(startParts[0]);
    startMonth = endMonth;
    startYear = endYear;
  } else if (startParts.length === 2) {
    [startDay, startMonth] = startParts.map(Number);
    startYear = endYear;
  } else if (startParts.length === 3) {
    [startDay, startMonth, startYear] = startParts.map(Number);
  } else {
    return null;
  }

  if ([startDay, startMonth, startYear].some(Number.isNaN)) {
    return null;
  }

  return {
    startDate: createDate(startYear, startMonth, startDay),
    endDate: createDate(endYear, endMonth, endDay),
  };
}

export function resolveRoadmapItems(items: IpoRoadmapItemBase[], currentDate = new Date()): IpoRoadmapItem[] {
  const today = normalizeDate(currentDate);
  let hasActiveItem = false;

  return items.map((item) => {
    const parsedRange = parseDateRange(item.dateRange);

    if (!parsedRange) {
      return {
        ...item,
        isActive: false,
        isSuccess: false,
      };
    }

    const startDate = normalizeDate(parsedRange.startDate);
    const endDate = normalizeDate(parsedRange.endDate);
    const isPast = today > endDate;
    const isInRange = !hasActiveItem && today >= startDate && today <= endDate;

    if (isInRange) {
      hasActiveItem = true;
    }

    return {
      ...item,
      isActive: isInRange,
      isSuccess: isPast,
    };
  });
}

const ipoRoadmapItemsBase: IpoRoadmapItemBase[] = [
  {
    titleKey: "introduceStock",
    dateLabelKey: "introduceStock",
    dateRange: "02/07 - 05/07",
  },
  {
    titleKey: "subscription",
    dateLabelKey: "subscription",
    dateRange: "06/07 - 27/07",
  },
  {
    titleKey: "allocation",
    dateLabelKey: "allocation",
    dateRange: "27/07 - 28/07",
  },
  {
    titleKey: "payment",
    dateLabelKey: "payment",
    dateRange: "30/07 - 04/08",
  },
  {
    titleKey: "ipoResult",
    dateLabelKey: "ipoResult",
    dateRange: "06/08/2026",
  },
  {
    titleKey: "hoseListingRegistration",
    dateLabelKey: "hoseListingRegistration",
    dateRange: "Dự kiến trong T8/2026",
  },
  {
    titleKey: "hoseListing",
    dateLabelKey: "hoseListing",
    dateRange: "Dự kiến Q4 2026",
  },
];

export const ipoRoadmapItems = resolveRoadmapItems(ipoRoadmapItemsBase);
