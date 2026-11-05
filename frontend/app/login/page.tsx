import { TypographyH1 } from '@dashboard/ui';
import { LogoIcon } from '@dashboard/ui';

import { SignInForm } from '@/features/auth/ui/signInForm';

export default function LoginPage() {
  return (
    <div className="flex h-dvh flex-col">
      <div className="px-3 py-5">
        <LogoIcon className="text-foreground h-6 w-7 shrink-0" />
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex w-full max-w-sm flex-col gap-4">
          <SignInForm />
          <TypographyH1
            className="text-center text-xl font-semibold"
            text="Login to dashboard-next"
          />
        </div>
      </div>
    </div>
  );
}
