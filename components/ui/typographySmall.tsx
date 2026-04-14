type TypographySmallType = {
  text: string;
  className?: string;
};

export function TypographySmall({ text, className }: TypographySmallType) {
  return (
    <small className={`text-sm leading-none font-medium ${className}`}>
      {text}
    </small>
  );
}
