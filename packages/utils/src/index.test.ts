import { describe, expect, it } from 'vitest';
import { cn, formatPhoneNumber } from './index';

describe('cn', () => {
  it('merges conditional class names and resolves Tailwind conflicts', () => {
    const isHidden = false;

    expect(cn('px-2', isHidden && 'hidden', 'px-4')).toBe('px-4');
  });
});

describe('formatPhoneNumber', () => {
  it('formats a 10 digit phone number', () => {
    expect(formatPhoneNumber('0901234567')).toBe('0901 234 567');
  });

  it('returns normalized digits when the length is not 10', () => {
    expect(formatPhoneNumber('+84 901 234 567')).toBe('84901234567');
  });
});
