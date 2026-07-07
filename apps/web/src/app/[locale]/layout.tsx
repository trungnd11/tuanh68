import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import AppFooter from "@/shared/ui/app-footer";
import AppHeader from "@/shared/ui/app-header";
import AppMain from "@/shared/ui/app-main";
import AppScrollReset from "@/shared/ui/app-scroll-reset";
import AppScrollTop from "@/shared/ui/app-scroll-top";
import { hasLocale, routing, type AppLocale } from "@/i18n/routing";
import { ReactQueryProvider } from "@/shared/providers/reactQueryProvider";

const localeMetadata: Record<AppLocale, { title: string; description: string; ogLocale: string }> = {
  vi: {
    title: "F88 - Cổ phiếu",
    description:
      "Landing page giới thiệu cổ phiếu F88 với thông tin doanh nghiệp, lộ trình IPO, tài liệu nhà đầu tư và hướng dẫn đăng ký mua cổ phiếu.",
    ogLocale: "vi_VN",
  },
  en: {
    title: "F88 - Shares",
    description:
      "F88 share landing page with company information, IPO roadmap, investor materials, and purchase registration guidance.",
    ogLocale: "en_US",
  },
};

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = hasLocale(locale) ? locale : routing.defaultLocale;
  const copy = localeMetadata[resolvedLocale];

  return {
    title: {
      default: copy.title,
      template: `%s | ${copy.title}`,
    },
    description: copy.description,
    alternates: {
      canonical: `/${resolvedLocale}`,
      languages: {
        vi: "/vi",
        en: "/en",
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      locale: copy.ogLocale,
      url: `/${resolvedLocale}`,
    },
    twitter: {
      title: copy.title,
      description: copy.description,
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      <ReactQueryProvider>
        <AppScrollReset />
        <AppHeader />
        <AppMain>{children}</AppMain>
        <AppFooter />
        <AppScrollTop />
      </ReactQueryProvider>
    </NextIntlClientProvider>
  );
}
