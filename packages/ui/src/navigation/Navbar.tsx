import { forwardRef, useState } from 'react';
import { cn } from '../utils/cn';
import { AppContainer } from "../layout";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  links?: NavLink[];
  actions?: React.ReactNode;
  variant?: 'default' | 'glass';
  mobileBreakpoint?: 'tablet' | 'laptop';
}

const Navbar = forwardRef<HTMLElement, NavbarProps>(
  ({ logo, links = [], actions, variant = 'default', mobileBreakpoint = 'laptop', className, ...props }, ref) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const desktopBreak = mobileBreakpoint === 'laptop' ? 'laptop' : 'tablet';

    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-[var(--z-header)] w-full",
          variant === "glass"
            ? "bg-(--color-surface-glass) backdrop-blur-glass border-b border-border-glass"
            : "bg-(--color-background-primary) border-b border-(--color-border-subtle)",
          className
        )}
        {...props}
      >
        <AppContainer size="2xl">
          <nav className="flex h-16 items-center justify-between laptop:h-20" aria-label="Main navigation">
            <div className="flex min-w-0 items-center gap-10">
              {logo && <div className="shrink-0">{logo}</div>}
              <div className={cn("hidden items-center gap-1", `${desktopBreak}:flex`)}>
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-2 text-body-sm text-(--color-text-secondary) hover:text-(--color-text-primary)",
                      "hover:bg-hover-surface rounded-md transition-colors duration-(--duration-fast)"
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              {actions && <div className={cn("hidden", `${desktopBreak}:flex`)}>{actions}</div>}
              <button
                type="button"
                className={cn(
                  "inline-flex items-center justify-center h-10 w-10 rounded-md",
                  "text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-hover-surface",
                  `${desktopBreak}:hidden`
                )}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </nav>
        </AppContainer>
        {menuOpen && (
          <div className={cn("border-t border-(--color-border-subtle)", `${desktopBreak}:hidden`)}>
            <AppContainer size="2xl">
              <div className="py-4 space-y-1">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-2 text-body-md text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-hover-surface rounded-md"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                {actions && <div className="pt-2 px-3">{actions}</div>}
              </div>
            </AppContainer>
          </div>
        )}
      </header>
    );
  },
);
Navbar.displayName = 'Navbar';

export { Navbar };
