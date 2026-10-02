import { TypographyType } from '@/shared/components/typography/typography.types';

export function TypographySmall({ text, className }: TypographyType) {
  return (
    <small className={`text-sm leading-none font-medium ${className}`}>
      {text}
    </small>
  );
}
