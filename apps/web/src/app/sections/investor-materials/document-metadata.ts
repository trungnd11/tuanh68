import path from "node:path";
import { appConfig } from "@/shared/config/app";

export type InvestorDocumentCategory = "legal" | "ir";
export type InvestorDocumentLocale = "VN" | "ENG";

export type InvestorDocumentMetadata = {
  key: string;
  category: InvestorDocumentCategory;
  locale: InvestorDocumentLocale;
  relativePath: string;
  title: string;
  publishedAt: string;
  sortOrder?: number;
  /** Normalize filename to NFD before percent-encoding for CDN objects uploaded from macOS. */
  normalizeNFD?: boolean;
};

type InvestorDocumentDefinition = Omit<InvestorDocumentMetadata, "title"> & {
  title?: string;
};

function getTitleFromRelativePath(relativePath: string) {
  return path.basename(relativePath, path.extname(relativePath));
}

function encodePathSegment(segment: string) {
  return encodeURIComponent(segment).replace(/%20/g, "+");
}

export function buildInvestorDocumentExternalUrl(
  relativePath: string,
  baseUrl = appConfig.investorDocumentBaseUrl,
  normalizeNFD?: boolean
) {
  const normalizedRelativePath = relativePath.replaceAll("\\", "/");
  const segments = normalizedRelativePath.split("/");
  if (normalizeNFD) {
    // CDN objects uploaded from macOS use decomposed Unicode (NFD) filenames.
    // Normalize only the filename (last segment) to NFD; the directory stays NFC.
    const lastIndex = segments.length - 1;
    segments[lastIndex] = segments[lastIndex].normalize("NFD");
  }
  const encodedPath = segments.map(encodePathSegment).join("/");

  return `${baseUrl.replace(/\/$/, "")}/${encodedPath}`;
}

function defineDocument(definition: InvestorDocumentDefinition): InvestorDocumentMetadata {
  return {
    ...definition,
    title: definition.title ?? getTitleFromRelativePath(definition.relativePath),
  };
}

export const investorDocumentMetadata: InvestorDocumentMetadata[] = [
  defineDocument({
    key: "ir-vn-q1-2026-earnings-call-presentation",
    category: "legal",
    locale: "VN",
    relativePath: "Tài liêu KQKD/VN/F88_Bài_trình_bày_KQKD_Quý_1.2026.pdf",
    publishedAt: "2026-03-12",
    sortOrder: 10,
  }),
  defineDocument({
    key: "ir-vn-q4-2025-newsletter",
    category: "legal",
    locale: "VN",
    relativePath: "Tài liêu KQKD/VN/Bản tin Nhà đầu tư Quý 4 năm 2025 - Vni.pdf",
    publishedAt: "2026-03-18",
    sortOrder: 20,
  }),
  defineDocument({
    key: "ir-vn-q1-2026-newsletter",
    category: "legal",
    locale: "VN",
    relativePath: "Tài liêu KQKD/VN/Bản tin Nhà đầu tư Quý 1 năm 2026.pdf",
    publishedAt: "2026-05-06",
    sortOrder: 30,
  }),
  defineDocument({
    key: "ir-vn-fy2025-earnings-call-presentation",
    category: "legal",
    locale: "VN",
    relativePath: "Tài liêu KQKD/VN/Bài_trình_bày_Công_bố_KQKD_quý_4_và_năm_2025.pdf",
    publishedAt: "2026-03-18",
    sortOrder: 40,
    normalizeNFD: true,
  }),
  defineDocument({
    key: "ir-vn-ir-talk-2026-06-25",
    category: "legal",
    locale: "VN",
    relativePath: "Tài liêu KQKD/VN/Bài_trình_bày_Sự_kiện_IR_Talk_25.06.2026.pdf",
    publishedAt: "2026-06-25",
    sortOrder: 50,
  }),
  defineDocument({
    key: "ir-en-q1-2026-earnings-call-presentation",
    category: "legal",
    locale: "ENG",
    relativePath: "Tài liêu KQKD/ENG/F88_1Q2026_Earnings_Call_Presentation.pdf",
    publishedAt: "2026-03-12",
    sortOrder: 10,
  }),
  defineDocument({
    key: "ir-en-q1-2026-newsletter",
    category: "legal",
    locale: "ENG",
    relativePath: "Tài liêu KQKD/ENG/F88_IR_NEWSLETTER_Q1.26_ENG.pdf",
    publishedAt: "2026-05-06",
    sortOrder: 20,
  }),
  defineDocument({
    key: "ir-en-q4-2025-newsletter",
    category: "legal",
    locale: "ENG",
    relativePath: "Tài liêu KQKD/ENG/F88_IR_Newsletter_Q4.25_En.pdf",
    publishedAt: "2026-03-18",
    sortOrder: 30,
  }),
  defineDocument({
    key: "ir-en-fy2025-earnings-call-presentation",
    category: "legal",
    locale: "ENG",
    relativePath: "Tài liêu KQKD/ENG/FY2025_Earnings_Call_Presentation.pdf",
    publishedAt: "2026-03-18",
    sortOrder: 40,
  }),
  defineDocument({
    key: "po-vn-ubck-public-offering-certificate",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/1. UBCK_Giấy chứng nhận chào bán chứng khoán ra công chúng.pdf",
    publishedAt: "2026-07-02",
    sortOrder: 10,
  }),
  defineDocument({
    key: "po-vn-notice-public-offering",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/2. F88_Thông báo chào bán cổ phiếu ra công chủng.pdf",
    publishedAt: "2026-07-02",
    sortOrder: 20,
  }),
  defineDocument({
    key: "po-vn-share-subscription-guideline",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/3. F88_Hướng dẫn đặt mua cổ phiếu.pdf",
    publishedAt: "2026-07-02",
    sortOrder: 30,
  }),
  defineDocument({
    key: "po-vn-share-subscription-form",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/4. F88_Giấy đăng ký mua cổ phiếu.docx",
    publishedAt: "2026-07-02",
    sortOrder: 40,
  }),
  defineDocument({
    key: "po-vn-prospectus",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/5. F88_Bản cáo bạch_Chào bán cổ phiếu.pdf",
    publishedAt: "2026-06-30",
    sortOrder: 50,
  }),
  defineDocument({
    key: "po-vn-business-registration-29",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/6. F88_Đăng ký kinh doanh lần 29.pdf",
    publishedAt: "2026-07-02",
    sortOrder: 60,
  }),
  defineDocument({
    key: "po-vn-agm-resolution-2026",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/7. Nghị quyết Đại hội đồng Cổ đông thường niên  2026_VIE.pdf",
    publishedAt: "2026-07-02",
    sortOrder: 70,
  }),
  defineDocument({
    key: "po-vn-bod-resolution-0604-02",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/8. 0604-02.NQ HĐQT thông qua PA chào bán thêm CP ra công chúng.pdf",
    publishedAt: "2026-04-06",
    sortOrder: 80,
  }),
  defineDocument({
    key: "po-vn-bod-resolution-amended-public-offering-plan",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/9. F88_NQ HĐQT vv điều chỉnh PA phát hành CP ra công chúng.pdf",
    publishedAt: "2026-07-02",
    sortOrder: 90,
  }),
  defineDocument({
    key: "po-vn-bod-resolution-amended-public-offering-plan-and-dossier",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/9. F88_NQ HĐQT vv điều chỉnh PA và HS chào bán thêm CP ra công chúng.pdf",
    publishedAt: "2026-07-02",
    sortOrder: 100,
  }),
  defineDocument({
    key: "po-vn-charter-2022-02-22",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/10.1_F88_Điều lệ_2022.02.22.pdf",
    publishedAt: "2022-02-22",
    sortOrder: 110,
  }),
  defineDocument({
    key: "po-vn-amended-charter-2023-05",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/10.2_F88_Điều lệ sửa đổi_05.2023.pdf",
    publishedAt: "2023-05-01",
    sortOrder: 120,
  }),
  defineDocument({
    key: "po-vn-amended-charter-2023-12-26",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/10.3_F88_Điều lệ sửa đổi_26.12.2023.pdf",
    publishedAt: "2023-12-26",
    sortOrder: 130,
  }),
  defineDocument({
    key: "po-vn-amended-charter-2024-10-16",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/10.4_F88_Điều lệ sửa đổi_16.10.2024.pdf",
    publishedAt: "2024-10-16",
    sortOrder: 140,
  }),
  defineDocument({
    key: "po-vn-amended-charter-2026-06-03",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/10.5_F88_Điều lệ sửa đổi_03.06.2026.pdf",
    publishedAt: "2026-06-03",
    sortOrder: 150,
  }),
  defineDocument({
    key: "po-vn-amended-charter-2026-06-18",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/10.6_F88_Điều lệ sửa đổi_18.06.2026.pdf",
    publishedAt: "2026-06-18",
    sortOrder: 160,
  }),
  defineDocument({
    key: "po-vn-fs-2024-sfs",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/11.1_F88_BCKD_31.12.2024_Riêng lẻ.pdf",
    publishedAt: "2024-12-31",
    sortOrder: 170,
  }),
  defineDocument({
    key: "po-vn-fs-2025-cfs",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/11.1_F88_BCKD_31.12.2025_Hợp nhất.pdf",
    publishedAt: "2025-12-31",
    sortOrder: 180,
  }),
  defineDocument({
    key: "po-vn-fs-2025-sfs",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/11.2_F88_BCKD_31.12.2025_Riêng lẻ.pdf",
    publishedAt: "2025-12-31",
    sortOrder: 190,
  }),
  defineDocument({
    key: "po-vn-fs-2024-cfs",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/11.3_F88_BCKD_31.12.2024_Hợp nhất.pdf",
    publishedAt: "2024-12-31",
    sortOrder: 200,
  }),
  defineDocument({
    key: "po-vn-fs-q1-2026-cfs",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/11.4_F88_BCKD_Q1.2026_Hợp nhất.pdf",
    publishedAt: "2026-03-31",
    sortOrder: 210,
  }),
  defineDocument({
    key: "po-vn-fs-q1-2026-sfs",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/11.5_F88_BCKD_Q1.2026_Riêng lẻ.pdf",
    publishedAt: "2026-03-31",
    sortOrder: 220,
  }),
  defineDocument({
    key: "po-vn-agm-proposal-charter-capital-increase-2026",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/12. F88KD_Tờ trình ĐHĐCĐ vv PA tăng vốn điều lệ_2026.pdf",
    publishedAt: "2026-07-02",
    sortOrder: 230,
  }),
  defineDocument({
    key: "po-vn-agm-resolution-business-2026",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/13. F88KD_Nghị quyết ĐHĐCĐ thường niên 2026.pdf",
    publishedAt: "2026-07-02",
    sortOrder: 240,
  }),
  defineDocument({
    key: "po-vn-business-registration-12",
    category: "ir",
    locale: "VN",
    relativePath: "Tài liệu PO/VN/14. F88KD_ĐKKD lần 12.pdf",
    publishedAt: "2026-07-02",
    sortOrder: 250,
  }),
  defineDocument({
    key: "po-en-ubck-public-offering-certificate",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/1. UBCK_Giấy chứng nhận chào bán chứng khoán ra công chúng.pdf",
    publishedAt: "2026-07-02",
    sortOrder: 10,
  }),
  defineDocument({
    key: "po-en-notice-public-offering",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/2. F88_Notice_PO.pdf",
    publishedAt: "2026-07-02",
    sortOrder: 20,
  }),
  defineDocument({
    key: "po-en-share-subscription-guideline",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/3. F88_Share Subscription and Payment guideline.pdf",
    publishedAt: "2026-07-02",
    sortOrder: 30,
  }),
  defineDocument({
    key: "po-en-share-subscription-form",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/4. Share subcription form.docx",
    publishedAt: "2026-07-02",
    sortOrder: 40,
  }),
  defineDocument({
    key: "po-en-prospectus",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/5. F88_Prospectus_30 Jun 2026.pdf",
    publishedAt: "2026-06-30",
    sortOrder: 50,
  }),
  defineDocument({
    key: "po-en-business-registration-29",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/6. F88_29th Business registration.pdf",
    publishedAt: "2026-07-02",
    sortOrder: 60,
  }),
  defineDocument({
    key: "po-en-agm-resolution-2026",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/7. F88_AGM_Resolution_2026.pdf",
    publishedAt: "2026-07-02",
    sortOrder: 70,
  }),
  defineDocument({
    key: "po-en-agm-resolution-2026-vie",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/7. Nghị quyết Đại hội đồng Cổ đông thường niên  2026_VIE.pdf",
    publishedAt: "2026-07-02",
    sortOrder: 80,
  }),
  defineDocument({
    key: "po-en-bod-resolution-approval-po",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/8. F88_BOD_Resolution_Approval PO.pdf",
    publishedAt: "2026-07-02",
    sortOrder: 90,
  }),
  defineDocument({
    key: "po-en-bod-resolution-approval-po-dossier",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/9. F88_BOD_Resolution_Approval PO dossier.pdf",
    publishedAt: "2026-07-02",
    sortOrder: 100,
  }),
  defineDocument({
    key: "po-en-bod-resolution-approval-po-amendments-2026",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/9. F88_BOD_Resolution_Approval PO_Amendments_2026.pdf",
    publishedAt: "2026-07-02",
    sortOrder: 110,
  }),
  defineDocument({
    key: "po-en-charter-2022-02-22",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/10.1_F88_Charter_2022.02.22.pdf",
    publishedAt: "2022-02-22",
    sortOrder: 120,
  }),
  defineDocument({
    key: "po-en-amended-charter-2023-05",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/10.2_F88_Amended charter_05.2023.pdf",
    publishedAt: "2023-05-01",
    sortOrder: 130,
  }),
  defineDocument({
    key: "po-en-amended-charter-2023-12-26",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/10.3_F88_Charter amendment_26 Dec 2023.pdf",
    publishedAt: "2023-12-26",
    sortOrder: 140,
  }),
  defineDocument({
    key: "po-en-amended-charter-2026-06-03",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/10.4_F88_Amended charter_3.6.2026.pdf",
    publishedAt: "2026-06-03",
    sortOrder: 150,
  }),
  defineDocument({
    key: "po-en-amended-charter-2026-06-18",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/10.5_F88_Amended charter_18.06.2026.pdf",
    publishedAt: "2026-06-18",
    sortOrder: 160,
  }),
  defineDocument({
    key: "po-en-fs-q1-2026-cfs",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/11.1_F88 Investment-Q1.26-CFS-EN.pdf",
    publishedAt: "2026-03-31",
    sortOrder: 170,
  }),
  defineDocument({
    key: "po-en-fs-q1-2026-sfs",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/11.2_F88 Investment-Q1.26-SFS-EN.pdf",
    publishedAt: "2026-03-31",
    sortOrder: 180,
  }),
  defineDocument({
    key: "po-en-fs-2025-cfs",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/11.3_F88 Investment-31-12-2025-CFS-EN.pdf",
    publishedAt: "2025-12-31",
    sortOrder: 190,
  }),
  defineDocument({
    key: "po-en-fs-2025-sfs",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/11.4_F88 Investment-31-12-2025-SFS-EN.pdf",
    publishedAt: "2025-12-31",
    sortOrder: 200,
  }),
  defineDocument({
    key: "po-en-fs-2024-cfs",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/11.5_F88 Investment JSC-31-12-2024-CFS-ENG.pdf",
    publishedAt: "2024-12-31",
    sortOrder: 210,
  }),
  defineDocument({
    key: "po-en-fs-2024-sfs",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/11.6_F88 Investment JSC-31-12-2024-SFS-ENG.pdf",
    publishedAt: "2024-12-31",
    sortOrder: 220,
  }),
  defineDocument({
    key: "po-en-agm-proposal-charter-capital-increase-2026",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/12. F88KD_AGM_Proposal_Charter capital increase plan_2026.pdf",
    publishedAt: "2026-07-02",
    sortOrder: 230,
  }),
  defineDocument({
    key: "po-en-agm-resolution-business-2026",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/13. F88 Business_AGM_Resolution_2026.pdf",
    publishedAt: "2026-07-02",
    sortOrder: 240,
  }),
  defineDocument({
    key: "po-en-business-registration-12",
    category: "ir",
    locale: "ENG",
    relativePath: "Tài liệu PO/ENG/14. F88 Business_12th Business registration.pdf",
    publishedAt: "2026-07-02",
    sortOrder: 250,
  }),
];
