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

export function getInvestorMaterialsMoreLabel(groupKey: InvestorDocumentGroup["key"], count: number) {
  return `Xem thêm (${count})`;
}

export function getInvestorMaterialsHeading() {
  return {
    title: "Tài liệu nhà đầu tư",
    description: "Cập nhật thông tin mới nhất về tình hình hoạt động và kết quả kinh doanh của F88",
    mobileBreakAfter: "",
  };
}

export function getInvestorMaterialFilters(): InvestorMaterialFilter[] {
  return [
    {
      key: "legal",
      label: "Kết quả kinh doanh",
    },
    {
      key: "ir",
      label: "Tài liệu IPO",
    },
  ];
}

function formatPublishedAt(publishedAt: string) {
  const [year, month, day] = publishedAt.split("-");

  return `Ngày đăng: ${day}/${month}/${year}`;
}

export function buildInvestorDocumentGroups(
  documents: InvestorServedDocument[]
): Record<string, InvestorDocumentGroup> {
  const localizedDocuments = documents.filter((item) => item.locale === "VN");

  return {
    legal: {
      key: "legal",
      lessLabel: "Thu gọn",
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
      lessLabel: "Thu gọn",
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
