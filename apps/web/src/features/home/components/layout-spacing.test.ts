import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = join(__dirname, '../../../../../..');

const read = (path: string) => readFileSync(join(root, path), 'utf8');

describe('homepage premium spacing contracts', () => {
  it('uses the shared container token for 20px, 32px, and 48px horizontal padding', () => {
    const theme = read('apps/web/src/styles/theme.css');
    const spacing = read('apps/web/src/styles/tokens/spacing.css');
    const container = read('packages/ui/src/layout/AppContainer.tsx');

    expect(theme).toContain('--spacing-container-x: clamp(1.25rem, 4.1667vw, 3rem);');
    expect(spacing).toContain('--spacing-container-x: clamp(1.25rem, 4.1667vw, 3rem);');
    expect(container).toContain('px-[var(--spacing-container-x)]');
    expect(container).toContain("'2xl': 'max-w-[var(--container-2xl)]'");
  });

  it('wires the web app to the shared ui package so global header changes are visible at runtime', () => {
    const webPackage = read('apps/web/package.json');
    const nextConfig = read('apps/web/next.config.ts');

    expect(webPackage).toContain('"@tuanh68/ui": "workspace:*"');
    expect(nextConfig).toContain("transpilePackages: ['@tuanh68/types', '@tuanh68/schemas', '@tuanh68/utils', '@tuanh68/ui']");
  });

  it('keeps header content inside AppContainer with premium responsive height', () => {
    const header = read('packages/ui/src/navigation/AppHeader.tsx');
    const desktopNavigation = read('packages/ui/src/navigation/DesktopNavigation.tsx');

    expect(header).toContain('<AppContainer size="2xl">');
    expect(header).toContain('flex h-16 tablet:h-[72px] desktop:h-20 items-center justify-between');
    expect(desktopNavigation).toContain('absolute left-1/2 hidden -translate-x-1/2 desktop:flex');
    expect(header).toContain('fixed top-0 left-0 right-0');
    expect(header).toContain('z-[var(--z-header)]');
  });

  it('renders only desktop chrome — no mobile navigation or drawer components', () => {
    const header = read('packages/ui/src/navigation/AppHeader.tsx');

    expect(header).toContain('border-[var(--color-header-border)]');
    expect(header).toContain('backdrop-blur-[12px]');
    expect(header).not.toContain('MobileNavigation');
    expect(header).not.toContain('HeaderDrawer');
    expect(header).not.toContain('drawerBottom');
    expect(header).not.toContain('menuOpen');
  });

  it('constrains hero content to a two-column premium grid on desktop', () => {
    const hero = read('apps/web/src/features/home/components/Hero/Hero.tsx');

    expect(hero).toContain('<AppContainer size="2xl" className="relative z-10 w-full py-20 laptop:py-[120px]">');
    expect(hero).toContain('grid items-center gap-12 laptop:grid-cols-[minmax(0,680px)_440px] laptop:gap-20 desktop:justify-between');
    expect(hero).toContain('mt-6 space-y-2');
    expect(hero).toContain('mt-10 flex flex-wrap gap-4');
    expect(hero).toContain('desktop:text-[5rem]');
  });

  it('sizes the quote form surface and controls for premium spacing', () => {
    const hero = read('apps/web/src/features/home/components/Hero/Hero.tsx');
    const form = read('apps/web/src/features/home/components/QuoteForm/QuoteForm.tsx');

    expect(hero).toContain('w-full min-w-0 laptop:w-[440px] laptop:justify-self-end');
    expect(hero).toContain('rounded-[28px] border border-border-glass bg-surface-glass p-6 shadow-glass backdrop-blur-glass tablet:p-8');
    expect(form).toContain('className="space-y-[18px]"');
    expect(form).toContain('className="h-[52px] text-[15px] font-bold"');
  });

  it('keeps stats separated from hero and constrained in a responsive glass grid', () => {
    const stats = read('apps/web/src/features/home/components/Statistics/Statistics.tsx');

    expect(stats).toContain('className="bg-background-primary py-14 laptop:py-20"');
    expect(stats).toContain('grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-4');
    expect(stats).toContain('h-full rounded-[24px] border border-border-glass bg-surface-glass p-[28px] backdrop-blur-glass');
  });

  it('keeps shared header and footer chrome in the app layout, not the homepage feature', () => {
    const home = read('apps/web/src/features/home/index.tsx');
    const layout = read('apps/web/src/app/layout.tsx');
    const chrome = read('apps/web/src/app/SiteChrome.tsx');

    expect(home).not.toContain('<Navbar');
    expect(home).not.toContain('<AppHeader');
    expect(home).not.toContain('<Footer');
    expect(layout).toContain('<SiteChrome>');
    expect(chrome).toContain('<AppHeader');
    expect(chrome).toContain('currentPath={pathname}');
    expect(chrome).toContain("{ label: 'Giới thiệu', href: '/about' }");
    expect(chrome).toContain("{ label: 'Tin tức', href: '/news' }");
    expect(chrome).toContain('<Footer');
  });
});
