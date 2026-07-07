'use client';

import { forwardRef, useState, useCallback } from 'react';
import { cn } from '../utils/cn';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  type?: 'single' | 'multiple';
  defaultOpen?: string[];
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ items, type = 'single', defaultOpen = [], className, ...props }, ref) => {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));

    const toggleItem = useCallback((id: string) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (type === 'single') {
            return new Set([id]);
          }
          next.add(id);
        }
        return next;
      });
    }, [type]);

    return (
      <div ref={ref} className={cn('divide-y divide-divider', className)} {...props}>
        {items.map((item) => {
          const isOpen = openItems.has(item.id);
          return (
            <div key={item.id}>
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
                className={cn(
                  'flex w-full items-center justify-between py-4 text-left text-title-sm text-text-primary',
                  'hover:text-text-accent transition-colors duration-fast',
                )}
              >
                <span>{item.title}</span>
                <svg
                  className={cn(
                    'h-5 w-5 shrink-0 text-text-muted transition-transform duration-normal',
                    isOpen && 'rotate-180',
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-normal ease-standard',
                  isOpen ? 'max-h-[500px] pb-4' : 'max-h-0',
                )}
                role="region"
                aria-hidden={!isOpen}
              >
                <div className="text-body-md text-text-secondary">
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);
Accordion.displayName = 'Accordion';

export { Accordion };
