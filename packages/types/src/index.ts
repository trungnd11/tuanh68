export type ProductStatus = "draft" | "published" | "archived";

export enum LeadSource {
  QUOTE_FORM = "quote_form",
  CONSULTATION_FORM = "consultation_form",
  CONTACT_PAGE = "contact_page",
}

export enum LeadStatus {
  NEW = "new",
  CONTACTED = "contacted",
  QUALIFIED = "qualified",
  LOST = "lost",
}
