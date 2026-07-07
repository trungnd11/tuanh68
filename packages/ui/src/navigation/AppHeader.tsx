'use client';

import { useEffect, useState } from 'react';
import { cn } from '../utils/cn';
import { AppContainer } from '../layout/AppContainer';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Giới thiệu', href: '/about' },
  { label: 'Ván phủ phim', href: '/products' },
  { label: 'Dự án', href: '/projects' },
  { label: 'Tin tức', href: '/news' },
  { label: 'Liên hệ', href: '/contact' },
];

export interface AppHeaderProps {
  currentPath?: string;
}

export function AppHeader({ currentPath = '/' }: AppHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    currentPath === href || (href !== '/' && currentPath.startsWith(href));

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-[var(--z-header)] border-b border-[var(--color-header-border)]',
        'transition-shadow duration-300 ease-standard',
        scrolled && 'shadow-[var(--color-header-shadow)]',
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(134.29deg,var(--color-header-bg-from),var(--color-header-bg-to))] backdrop-blur-[12px]"
      />
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-0 bg-[linear-gradient(180deg,var(--color-header-bg-from)_30%,var(--color-header-bg-to)_80%)] transition-opacity duration-300 ease-standard backdrop-blur-[12px]',
          scrolled ? 'opacity-100' : 'opacity-0',
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          'absolute bottom-0 left-0 right-0 h-px bg-border-subtle transition-opacity duration-300 ease-standard',
          scrolled ? 'opacity-100' : 'opacity-0',
        )}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgb(255_255_255_/_0.1)]"
      />

      <div className="relative z-10">
        <AppContainer size="2xl">
          <div className="flex h-16 desktop:h-20 items-center justify-between">
            <a href="/" aria-label="Trang chủ" className="flex items-center gap-3 shrink-0">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="32" height="32" rx="6" className="fill-primary-500/15 stroke-primary-500" strokeWidth="1.5" />
                <path d="M10 18h16M18 10v16" className="stroke-primary-300" strokeWidth="2" strokeLinecap="round" />
                <circle cx="18" cy="18" r="4" className="fill-primary-300/30" />
                <circle cx="18" cy="18" r="1.5" className="fill-primary-300" />
              </svg>
              <span className="font-bold text-[20px] text-white tracking-[1px]">
                Tuấn Anh 68
              </span>
            </a>

            <div className="flex items-center">
              <nav aria-label="Main navigation" className="hidden desktop:flex items-center">
                {navItems.map((item, index) => {
                  const active = isActive(item.href);
                  return (
                    <div key={item.href} className={cn(index > 0 && 'pl-[32px]')}>
                      <a
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'flex flex-col items-start px-[12px] transition-colors duration-fast ease-standard',
                          active
                            ? 'border-b-2 border-[#48a6a7] pb-[10px] pt-[8px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)]'
                            : 'py-[8px] drop-shadow-[0px_1px_0.5px_rgba(0,0,0,0.05)]',
                        )}
                      >
                        <span className="flex flex-col justify-center leading-[0]">
                          <span
                            className={cn(
                              'text-[14px] leading-[20px] tracking-[0.35px] uppercase transition-colors duration-fast ease-standard',
                              active
                                ? 'font-semibold text-white'
                                : 'font-medium text-[var(--color-text-nav-inactive)]',
                            )}
                          >
                            {item.label}
                          </span>
                        </span>
                      </a>
                    </div>
                  );
                })}
              </nav>

              <div className="pl-[32px]">
                <a
                  href="tel:0983570760"
                  className="inline-flex items-center gap-2 rounded-[6px] bg-[var(--color-accent-teal)] px-5 py-2 text-[14px] font-bold text-white shadow-lg transition-colors duration-fast ease-standard hover:bg-[var(--color-accent-teal-hover)]"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M13 10.08v1.77a1.18 1.18 0 0 1-1.29 1.18 11.66 11.66 0 0 1-5.07-1.81 11.5 11.5 0 0 1-3.53-3.52A11.67 11.67 0 0 1 1.3 2.29 1.18 1.18 0 0 1 2.47 1h1.77a1.18 1.18 0 0 1 1.18.95 7.57 7.57 0 0 0 .41 1.67 1.18 1.18 0 0 1-.27 1.25l-.75.75a9.44 9.44 0 0 0 3.53 3.52l.75-.75a1.18 1.18 0 0 1 1.25-.27 7.57 7.57 0 0 0 1.67.41A1.18 1.18 0 0 1 13 10.08z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  0983 570 760
                </a>
              </div>
            </div>
          </div>
        </AppContainer>
      </div>
    </header>
  );
}
