import { TypographyH3 } from '@dashboard/ui';
import { TypographySmall } from '@dashboard/ui';
import { WelcomeIcon } from '@dashboard/ui';

export default function Home() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col gap-20">
        <WelcomeIcon />

        <div className="flex flex-col items-center gap-4">
          <TypographyH3 text="Welcome to Dashboard Next!" />
          <TypographySmall text="Your data, time, and personnel management service" />
        </div>
      </div>
    </div>
  );
}
