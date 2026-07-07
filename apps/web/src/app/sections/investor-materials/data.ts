import type { InvestorServedDocument } from "@/app/sections/investor-materials/server/documents";

export type InvestorMaterialFilter = {
  key: string;
  label: string;
};

export type InvestorDocumentItem = {
  title: string;
  subtitle: string;
  href: string;
  downloadHref: string;
};

export type InvestorDocumentGroup = {
  key: string;
  items: InvestorDocumentItem[];
  lessLabel: string;
  moreHref: string;
};

export type InvestorMaterialsTranslations = {
  (key: "heading.title"): string;
  (key: "heading.description"): string;
  (key: "heading.mobileBreakAfter"): string;
  (key: "filters.businessResults"): string;
  (key: "filters.ipoMaterials"): string;
  (key: "groups.businessResults.monthly.moreLabel", values: { count: number }): string;
  (key: "groups.businessResults.monthly.lessLabel"): string;
  (key: "groups.ipoMaterials.monthly.moreLabel", values: { count: number }): string;
  (key: "groups.ipoMaterials.monthly.lessLabel"): string;
};

export function getInvestorMaterialsMoreLabel(
  t: InvestorMaterialsTranslations,
  groupKey: InvestorDocumentGroup["key"],
  count: number
) {
  return groupKey === "legal"
    ? t("groups.businessResults.monthly.moreLabel", { count })
    : t("groups.ipoMaterials.monthly.moreLabel", { count });
}

export function getInvestorMaterialsHeading(t: InvestorMaterialsTranslations) {
  return {
    title: t("heading.title"),
    description: t("heading.description"),
    mobileBreakAfter: t("heading.mobileBreakAfter"),
  };
}

export function getInvestorMaterialFilters(t: InvestorMaterialsTranslations): InvestorMaterialFilter[] {
  return [
    {
      key: "legal",
      label: t("filters.businessResults"),
    },
    {
      key: "ir",
      label: t("filters.ipoMaterials"),
    },
  ];
}

function formatPublishedAt(publishedAt: string) {
  const [year, month, day] = publishedAt.split("-");

  return `Ngày đăng: ${day}/${month}/${year}`;
}

function getDocumentLocale(locale: string) {
  return locale === "en" ? "ENG" : "VN";
}

export function buildInvestorDocumentGroups(
  t: InvestorMaterialsTranslations,
  documents: InvestorServedDocument[],
  locale: string
): Record<string, InvestorDocumentGroup> {
  const documentLocale = getDocumentLocale(locale);
  const localizedDocuments = documents.filter((item) => item.locale === documentLocale);

  return {
    legal: {
      key: "legal",
      lessLabel: t("groups.businessResults.monthly.lessLabel"),
      moreHref: "#",
      items: localizedDocuments
        .filter((item) => item.category === "legal")
        .map((item) => ({
          title: item.title,
          subtitle: formatPublishedAt(item.publishedAt),
          href: item.href,
          downloadHref: item.downloadHref,
        })),
    },
    ir: {
      key: "ir",
      lessLabel: t("groups.ipoMaterials.monthly.lessLabel"),
      moreHref: "#",
      items: localizedDocuments
        .filter((item) => item.category === "ir")
        .map((item) => ({
          title: item.title,
          subtitle: formatPublishedAt(item.publishedAt),
          href: item.href,
          downloadHref: item.downloadHref,
        })),
    },
  };
}
