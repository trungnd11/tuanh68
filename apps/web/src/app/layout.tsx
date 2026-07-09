import { SquircleNoScript } from "@squircle-js/react";
import { Inter } from "next/font/google";
import Script from "next/script";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import AppFooter from "@/shared/ui/app-footer";
import AppHeader from "@/shared/ui/app-header";
import AppMain from "@/shared/ui/app-main";
import AppScrollReset from "@/shared/ui/app-scroll-reset";
import AppScrollTop from "@/shared/ui/app-scroll-top";
import { ReactQueryProvider } from "@/shared/providers/reactQueryProvider";
import "./globals.css";

const siteUrl = process.env.SITE_URL;

if (!siteUrl) {
  throw new Error("Missing SITE_URL");
}

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tú Anh 68",
    template: "%s | Tú Anh 68",
  },
  description:
    "Tú Anh 68 - Công ty sản xuất và cung cấp ván ép, ván phủ phim chất lượng cao. Giới thiệu sản phẩm, dự án và tin tức ngành gỗ.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    locale: "vi_VN",
    siteName: "Tú Anh 68",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className={`${inter.className} bg-main-app-bg-content`} suppressHydrationWarning>
        <Script id="cleanup-ext-attrs" strategy="afterInteractive">
          {`(function(){try{new MutationObserver(function(m){m.forEach(function(r){if(r.type==="attributes"&&(r.attributeName==="bis_skin_checked"||r.attributeName==="bis_register")){r.target.removeAttribute(r.attributeName)}})}).observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:["bis_skin_checked","bis_register"]})}catch(e){}})()`}
        </Script>
        <SquircleNoScript />
        <ReactQueryProvider>
          <AppScrollReset />
          <AppHeader />
          <AppMain>{children}</AppMain>
          <AppFooter />
          <AppScrollTop />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
