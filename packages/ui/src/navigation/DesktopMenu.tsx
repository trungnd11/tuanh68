import type { HeaderLink } from './AppHeader';
import { NavItem } from './NavItem';

export interface DesktopMenuProps {
  links: HeaderLink[];
  currentPath?: string;
}

const isActivePath = (currentPath: string | undefined, href: string) =>
  currentPath === href || (href !== '/' && Boolean(currentPath?.startsWith(href)));

export function DesktopMenu({ links, currentPath }: DesktopMenuProps) {
  return (
    <div className="flex items-center gap-[32px]">
      {links.map((link) => (
        <NavItem
          key={link.href}
          href={link.href}
          label={link.label}
          active={isActivePath(currentPath, link.href)}
        />
      ))}
    </div>
  );
}
