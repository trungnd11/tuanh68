import { cn } from '../utils/cn';

export interface NavItemProps {
  href: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
  mobile?: boolean;
}

export function NavItem({ href, label, active = false, onClick, mobile = false }: NavItemProps) {
  if (mobile) {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'flex items-center rounded-md px-3 py-3 text-body-md font-medium transition-colors duration-fast ease-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
          active
            ? 'bg-primary-500/10 text-primary-300'
            : 'text-text-secondary hover:bg-hover-surface hover:text-text-primary',
        )}
      >
        {label}
      </a>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group relative rounded-md px-3 py-2 transition-colors duration-fast ease-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring drop-shadow-[0px_1px_0.5px_rgba(0,0,0,0.05)]',
      )}
    >
      <span
        className={cn(
          'text-[14px] font-medium uppercase tracking-[0.35px] transition-colors duration-fast ease-standard',
          active ? 'text-white' : 'text-[var(--color-text-nav-inactive)] group-hover:text-white',
        )}
      >
        {label}
      </span>
    </a>
  );
}
