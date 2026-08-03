import { signIn } from '@/auth';
import { Button } from '@/shared/components/button/button';

export function SignInForm() {
  return (
    <div className="flex flex-col gap-4">
      <form
        action={async () => {
          'use server';
          await signIn('google', { redirectTo: '/' });
        }}>
        <Button type="submit" className="w-full">
          Войти через Google
        </Button>
      </form>
    </div>
  );
}
