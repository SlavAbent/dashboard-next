import { TypographyType } from '@/shared/ui/Typography/types';

export function TypographyH2({ text, className }: TypographyType) {
  return (
    <h3
      className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}>
      {text}
    </h3>
  );
}
