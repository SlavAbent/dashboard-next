import cn from 'clsx';

import { GoogleSignInIcon } from '@/shared/icons/ui/googleSignInIcon';

type GoogleSignInButtonProps = React.ComponentProps<'button'>;

export const GoogleSignInButton = ({
  className,
  type = 'submit',
  children = '',
  ...props
}: GoogleSignInButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        'group relative box-border flex h-10 w-10 min-w-min cursor-pointer items-center justify-center overflow-hidden rounded-[20px] border border-[#747775] bg-white text-sm font-normal tracking-[0.25px] whitespace-nowrap text-[#1f1f1f] transition-[background-color,border-color,box-shadow] duration-[218ms] outline-none select-none hover:shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] active:shadow-none',
        'font-[Roboto,arial,sans-serif]',
        className
      )}
      {...props}>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#001d35] opacity-0 transition-opacity duration-[218ms] group-active:opacity-[0.12]"
      />
      <span className="relative flex items-center justify-center">
        <GoogleSignInIcon />
        <span>{children}</span>
      </span>
    </button>
  );
};
