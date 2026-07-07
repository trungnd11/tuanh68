import { forwardRef } from 'react';
import { cn } from '../utils/cn';
import { AppContainer } from '../layout/AppContainer';
import { Divider } from '../display/Divider';

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  columns?: FooterColumn[];
  bottomContent?: React.ReactNode;
}

const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ columns = [], bottomContent, className, ...props }, ref) => {
    return (
      <footer ref={ref} className={cn('bg-background-secondary border-t border-border-subtle', className)} {...props}>
        <AppContainer size="2xl">
          {columns.length > 0 && (
            <div className="py-16">
              <div className="grid grid-cols-2 laptop:grid-cols-4 gap-8">
                {columns.map((column) => (
                  <div key={column.title}>
                    <h4 className="text-label text-text-primary mb-4">{column.title}</h4>
                    <ul className="space-y-3">
                      {column.links.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            className="text-body-sm text-text-muted hover:text-text-secondary transition-colors duration-fast"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
          {bottomContent && (
            <>
              <Divider />
              <div className="py-6">{bottomContent}</div>
            </>
          )}
        </AppContainer>
      </footer>
    );
  },
);
Footer.displayName = 'Footer';

export { Footer };
