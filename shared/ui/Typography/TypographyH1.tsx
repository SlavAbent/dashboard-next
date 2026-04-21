import { TypographyType } from '@/shared/ui/Typography/types';

export function TypographyH1({ text, className }: TypographyType) {
  return (
    <h3
      className={`scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance ${className}`}>
      {text}
    </h3>
  );
}
