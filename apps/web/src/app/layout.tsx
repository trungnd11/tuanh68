import type { Metadata } from 'next';
import { SiteChrome } from './SiteChrome';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Tuấn Anh 68 Website',
  description: 'Website chính thức của Tuấn Anh 68.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body suppressHydrationWarning>
        <SiteChrome>
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
