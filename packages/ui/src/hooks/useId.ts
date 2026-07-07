import { useId as useReactId } from 'react';

export function useId(id?: string): string {
  const generatedId = useReactId();
  return id ?? generatedId;
}
