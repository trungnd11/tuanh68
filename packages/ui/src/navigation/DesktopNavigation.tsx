import type { HeaderLink } from './AppHeader';
import { DesktopMenu } from './DesktopMenu';

export interface DesktopNavigationProps {
  links: HeaderLink[];
  currentPath?: string;
  cta?: React.ReactNode;
}

export function DesktopNavigation({ links, currentPath, cta }: DesktopNavigationProps) {
  return (
    <>
      <nav aria-label="Main navigation" className="absolute left-1/2 hidden -translate-x-1/2 desktop:flex">
        <DesktopMenu links={links} currentPath={currentPath} />
      </nav>
      <div className="shrink-0">{cta}</div>
    </>
  );
}
