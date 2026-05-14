import { TypographyType } from '@/shared/ui/Typography/typography.types';

export function TypographySmall({ text, className }: TypographyType) {
  return (
    <small className={`text-sm leading-none font-medium ${className}`}>
      {text}
    </small>
  );
}
