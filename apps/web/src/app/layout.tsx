import { SquircleNoScript } from "@squircle-js/react";
import { getLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = process.env.SITE_URL;

if (!siteUrl) {
  throw new Error("Missing SITE_URL");
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className="h-full antialiased">
      <body className={`${inter.className} bg-main-app-bg-content`} suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{new MutationObserver(function(m){m.forEach(function(r){if(r.type==="attributes"&&(r.attributeName==="bis_skin_checked"||r.attributeName==="bis_register")){r.target.removeAttribute(r.attributeName)}})}).observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:["bis_skin_checked","bis_register"]})}catch(e){}})()`,
          }}
        />
        <SquircleNoScript />
        {children}
      </body>
    </html>
  );
}
