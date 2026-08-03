import { SignInForm } from '@/features/auth/ui/signInForm';

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center p-6">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1 className="text-center text-xl font-semibold">Вход в Dashboard</h1>
        <SignInForm />
      </div>
    </div>
  );
}
