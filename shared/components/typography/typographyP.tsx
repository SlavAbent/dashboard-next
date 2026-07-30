import { TypographyType } from '@/shared/components/typography/typography.types';

export function TypographyP({ text, className }: TypographyType) {
  return <h3 className={`leading-7 ${className}`}>{text}</h3>;
}
