'use client';

import { usePathname } from 'next/navigation';
import { AppHeader, Footer, HeaderCTA } from '@tuanh68/ui';

const navLinks = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Giới thiệu', href: '/about' },
  { label: 'Ván phủ phim', href: '/products' },
  { label: 'Dự án', href: '/projects' },
  { label: 'Tin tức', href: '/news' },
  { label: 'Liên hệ', href: '/contact' },
];

const footerColumns = [
  {
    title: 'Sản phẩm',
    links: [
      { label: 'Ván ép phủ phim 12mm', href: '/products/van-ep-phu-phim-12mm' },
      { label: 'Ván ép phủ phim 15mm', href: '/products/van-ep-phu-phim-15mm' },
      { label: 'Ván ép phủ phim 18mm', href: '/products/van-ep-phu-phim-18mm' },
      { label: 'Coffa đỏ Tuấn Anh 68', href: '/products/coffa-do-tuan-anh-68' },
    ],
  },
  {
    title: 'Về chúng tôi',
    links: [
      { label: 'Giới thiệu', href: '/about' },
      { label: 'Nhà máy', href: '/about#factory' },
      { label: 'Quy trình sản xuất', href: '/about#process' },
      { label: 'Tin tức', href: '/news' },
    ],
  },
  {
    title: 'Hỗ trợ',
    links: [
      { label: 'Câu hỏi thường gặp', href: '/faq' },
      { label: 'Chính sách bảo hành', href: '/warranty' },
      { label: 'Chính sách vận chuyển', href: '/shipping' },
      { label: 'Liên hệ', href: '/contact' },
    ],
  },
  {
    title: 'Liên hệ',
    links: [
      { label: 'Hotline: 1900 XXXX', href: 'tel:1900XXXX' },
      { label: 'Email: info@tuananh68.vn', href: 'mailto:info@tuananh68.vn' },
      { label: 'Bình Dương, Việt Nam', href: '#' },
    ],
  },
];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <AppHeader
        logo={
          <>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true" className="shrink-0">
              <rect x="2" y="2" width="32" height="32" rx="6" className="fill-primary-500/15 stroke-primary-500" strokeWidth="1.5" />
              <path d="M10 18h16M18 10v16" className="stroke-primary-300" strokeWidth="2" strokeLinecap="round" />
              <circle cx="18" cy="18" r="4" className="fill-primary-300/30" />
              <circle cx="18" cy="18" r="1.5" className="fill-primary-300" />
            </svg>
            <span className="text-title-lg font-bold tracking-[-0.02em] text-text-primary">
              Tuấn Anh 68
            </span>
          </>
        }
        links={navLinks}
        cta={
          <HeaderCTA>
            <a
              href="tel:0983570760"
              className="inline-flex items-center gap-2 rounded-[6px] bg-[var(--color-accent-teal)] px-5 py-2 text-[14px] font-bold text-white shadow-lg transition-colors duration-fast ease-standard hover:bg-[var(--color-accent-teal-hover)]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M13 10.08v1.77a1.18 1.18 0 0 1-1.29 1.18 11.66 11.66 0 0 1-5.07-1.81 11.5 11.5 0 0 1-3.53-3.52A11.67 11.67 0 0 1 1.3 2.29 1.18 1.18 0 0 1 2.47 1h1.77a1.18 1.18 0 0 1 1.18.95 7.57 7.57 0 0 0 .41 1.67 1.18 1.18 0 0 1-.27 1.25l-.75.75a9.44 9.44 0 0 0 3.53 3.52l.75-.75a1.18 1.18 0 0 1 1.25-.27 7.57 7.57 0 0 0 1.67.41A1.18 1.18 0 0 1 13 10.08z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              0983 570 760
            </a>
          </HeaderCTA>
        }
        currentPath={pathname}
        drawerBottom={
          <div className="space-y-1.5 border-t border-border-subtle pt-4">
            <p className="text-caption text-text-subtle">Hotline: 1900 XXXX</p>
            <p className="text-caption text-text-subtle">info@tuananh68.vn</p>
            <p className="text-caption text-text-subtle">Bình Dương, Việt Nam</p>
          </div>
        }
      />
      {children}
      <Footer
        columns={footerColumns}
        bottomContent={
          <div className="flex flex-col tablet:flex-row items-center justify-between gap-4">
            <span className="text-body-sm text-text-muted">
              © {new Date().getFullYear()} Tuấn Anh 68. All rights reserved.
            </span>
            <span className="text-body-sm text-text-subtle">
              Địa chỉ: Bình Dương, Việt Nam
            </span>
          </div>
        }
      />
    </>
  );
}
