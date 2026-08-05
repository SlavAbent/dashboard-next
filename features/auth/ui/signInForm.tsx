import { signIn } from '@/auth';
import { GoogleSignInButton } from '@/shared/components/googleSignInButton/googleSignInButton';

export function SignInForm() {
  async function handleAuthMethod(method: string) {
    'use server';
    await signIn(method, { redirectTo: '/' });
  }
  return (
    <form
      action={handleAuthMethod.bind(null, 'google')}
      className="flex w-full items-center justify-center">
      <GoogleSignInButton />
    </form>
  );
}
