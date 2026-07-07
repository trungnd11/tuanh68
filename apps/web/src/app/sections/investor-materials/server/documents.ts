import "server-only";

import { cache } from "react";
import { appConfig } from "@/shared/config/app";
import {
  buildInvestorDocumentExternalUrl,
  investorDocumentMetadata,
  type InvestorDocumentCategory,
  type InvestorDocumentLocale,
} from "@/app/sections/investor-materials/document-metadata";

export type InvestorServedDocument = {
  key: string;
  category: InvestorDocumentCategory;
  locale: InvestorDocumentLocale;
  title: string;
  publishedAt: string;
  relativePath: string;
  viewUrl: string;
  downloadUrl: string;
  href: string;
  downloadHref: string;
};

const getInvestorServedDocumentsCached = cache(async (): Promise<InvestorServedDocument[]> => {
  if (!appConfig.investorDocumentBaseUrl) {
    return [];
  }

  return investorDocumentMetadata
    .slice()
    .sort((left, right) => {
      if (left.category !== right.category) {
        return left.category.localeCompare(right.category);
      }

      if (left.locale !== right.locale) {
        return left.locale.localeCompare(right.locale);
      }

      return (left.sortOrder ?? Number.MAX_SAFE_INTEGER) - (right.sortOrder ?? Number.MAX_SAFE_INTEGER);
    })
    .map((item) => {
      const externalUrl = buildInvestorDocumentExternalUrl(item.relativePath, undefined, item.normalizeNFD);

      return {
        key: item.key,
        category: item.category,
        locale: item.locale,
        title: item.title,
        publishedAt: item.publishedAt,
        relativePath: item.relativePath,
        viewUrl: externalUrl,
        downloadUrl: externalUrl,
        href: `/documents/${item.key}`,
        downloadHref: `/documents/${item.key}?download=1`,
      };
    });
});

export async function getInvestorServedDocuments() {
  return getInvestorServedDocumentsCached();
}

export async function getInvestorServedDocumentByKey(key: string) {
  const documents = await getInvestorServedDocumentsCached();

  return documents.find((item) => item.key === key) ?? null;
}
