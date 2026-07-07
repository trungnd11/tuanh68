'use client';

import { forwardRef, useEffect, useState } from 'react';
import { cn } from '../utils/cn';
import { AppContainer } from '../layout/AppContainer';
import { DesktopNavigation } from './DesktopNavigation';
import { HeaderLogo } from './HeaderLogo';

export interface HeaderLink {
  label: string;
  href: string;
}

export interface AppHeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  links?: HeaderLink[];
  cta?: React.ReactNode;
  currentPath?: string;
}

const AppHeader = forwardRef<HTMLElement, AppHeaderProps>(
  ({ logo, links = [], cta, currentPath = '/', className, ...props }, ref) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 20);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
      <header
        ref={ref}
        className={cn(
          'fixed top-0 left-0 right-0 z-[var(--z-header)] border-b border-[var(--color-header-border)]',
          'transition-shadow duration-300 ease-standard',
          scrolled && 'shadow-[var(--color-header-shadow)]',
          className,
        )}
        {...props}
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
            <div className="flex h-16 tablet:h-[72px] desktop:h-20 items-center justify-between">
              <div className="shrink-0">{logo && <HeaderLogo>{logo}</HeaderLogo>}</div>
              <DesktopNavigation links={links} currentPath={currentPath} cta={cta} />
            </div>
          </AppContainer>
        </div>
      </header>
    );
  },
);

AppHeader.displayName = 'AppHeader';

export { AppHeader };
