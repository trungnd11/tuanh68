import Link from "next/link";

interface AppBreadcrumbItem {
  href: string;
  label: string;
}

interface AppBreadcrumbProps {
  items: readonly AppBreadcrumbItem[];
  className?: string;
}

function ChevronIcon() {
  return (
    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.53 5.47c.293.293.293.769 0 1.062l-3.75 3.75a.752.752 0 0 1-1.062-1.062L4.938 6 1.72 2.78a.752.752 0 0 1 1.062-1.062l3.75 3.75-.002.002Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function AppBreadcrumb({ items, className = "" }: AppBreadcrumbProps) {
  return (
    <div className={`app-breadcrumb flex items-center gap-2 ${className}`.trim()}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <div key={item.href} className="flex items-center gap-2">
            {i > 0 && (
              <span className="flex shrink-0 pb-[2.5px] pt-[1.5px] text-[rgba(255,255,255,0.6)]">
                <ChevronIcon />
              </span>
            )}
            {isLast ? (
              <span className="text-sm font-medium leading-5 text-app-brand-teal">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-sm font-normal leading-5 text-[rgba(255,255,255,0.6)] no-underline"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
