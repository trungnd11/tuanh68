import { forwardRef, useId } from 'react';
import { cn } from '../utils/cn';
import { AppLabel } from './AppLabel';
import { AppHelperText } from './AppHelperText';
import { AppErrorText } from './AppErrorText';

export interface AppFieldProps {
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  id?: string;
  className?: string;
  children?: React.ReactNode | ((props: { id: string; 'aria-invalid'?: boolean; 'aria-describedby'?: string }) => React.ReactNode);
}

const AppField = forwardRef<HTMLDivElement, AppFieldProps>(({
  label,
  required = false,
  helperText,
  error,
  id: externalId,
  className,
  children,
  ...props
}, ref) => {
  const generatedId = useId();
  const fieldId = externalId || generatedId;
  const errorId = `${fieldId}-error`;
  const helperId = `${fieldId}-helper`;

  return (
    <div
      ref={ref}
      className={cn('mb-form-field', className)}
      {...props as React.HTMLAttributes<HTMLDivElement>}
    >
      {label && (
        <AppLabel htmlFor={fieldId} required={required}>
          {label}
        </AppLabel>
      )}
      {typeof children === 'function'
        ? (children as (props: { id: string; 'aria-invalid'?: boolean; 'aria-describedby'?: string }) => React.ReactNode)({
            id: fieldId,
            'aria-invalid': !!error || undefined,
            'aria-describedby': error ? errorId : helperText ? helperId : undefined,
          })
        : children}
      {helperText && !error && (
        <AppHelperText id={helperId}>{helperText}</AppHelperText>
      )}
      {error && (
        <AppErrorText id={errorId}>{error}</AppErrorText>
      )}
    </div>
  );
});
AppField.displayName = 'AppField';

export { AppField };
