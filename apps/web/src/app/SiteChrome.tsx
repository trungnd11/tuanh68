'use client';

import { usePathname } from 'next/navigation';
import { AppHeader, Footer } from '@tuanh68/ui';

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
      <AppHeader currentPath={pathname} />
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
