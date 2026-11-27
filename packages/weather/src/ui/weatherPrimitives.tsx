import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from 'react';

export const WeatherText = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => (
  <small className={`text-sm leading-none font-medium ${className}`}>
    {children}
  </small>
);

export const WeatherSkeleton = ({ className = '' }: { className?: string }) => (
  <div
    className={`bg-muted/60 before:animate-shimmer relative w-full overflow-hidden rounded-md before:absolute before:inset-0 before:-translate-x-full before:skew-x-12 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent ${className}`}
  />
);

export const WeatherInput = ({
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`border-input focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-sm border bg-transparent py-[7px] pl-3 text-[14px] transition-colors outline-none focus-visible:ring-1 ${className}`}
  />
);

export const WeatherButton = ({
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type="button"
    {...props}
    className={`bg-secondary text-secondary-foreground flex h-10 cursor-pointer items-center justify-center gap-2 rounded-sm px-2.5 text-xs font-medium transition-all disabled:pointer-events-none disabled:opacity-50 ${className}`}
  />
);
