import { TypographyType } from '@/shared/components/typography/typography.types';

export function TypographyH3({ text, className }: TypographyType) {
  return (
    <h3
      className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}>
      {text}
    </h3>
  );
}
