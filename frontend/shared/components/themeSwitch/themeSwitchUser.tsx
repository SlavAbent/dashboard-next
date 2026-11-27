import { cn } from '@lib/cn';
import { CircleUserRound } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/avatar/avatar';
import type { ThemeSwitchUser } from '@/shared/components/themeSwitch/themeSwitch.types';

const getUserDetails = (user?: ThemeSwitchUser) => {
  const userName = user?.name?.trim() || 'Пользователь';
  const [firstName = '', ...rest] = userName.split(/\s+/);
  const lastName = rest.at(-1);
  const initial = firstName.charAt(0).toUpperCase();
  const displayName = lastName
    ? `${initial}.${lastName.charAt(0).toUpperCase()}${lastName.slice(1)}`
    : `${initial}.`;

  return { userName, displayName, avatarName: initial };
};

export const ThemeSwitchTriggerUser = ({
  user,
  showUserName,
}: {
  user?: ThemeSwitchUser;
  showUserName: boolean;
}) => {
  if (!user) return <CircleUserRound aria-hidden className="size-6" />;

  const { userName, displayName, avatarName } = getUserDetails(user);

  return (
    <>
      <Avatar className="size-8">
        <AvatarImage src={user.image ?? ''} alt={userName} />
        <AvatarFallback>{avatarName}</AvatarFallback>
      </Avatar>
      <span
        aria-hidden={!showUserName}
        className={cn(
          'shrink-0 overflow-hidden text-sm font-medium whitespace-nowrap',
          'transition-[max-width,margin-left,opacity] duration-500 ease-in-out',
          showUserName
            ? 'ml-3 max-w-28 opacity-100'
            : 'pointer-events-none ml-0 max-w-0 opacity-0'
        )}>
        {displayName}
      </span>
    </>
  );
};

export const ThemeSwitchMenuUser = ({ user }: { user: ThemeSwitchUser }) => {
  const { userName, avatarName } = getUserDetails(user);

  return (
    <div className="flex min-w-0 items-center gap-2 px-1 py-1.5">
      <Avatar className="size-8">
        <AvatarImage src={user.image ?? ''} alt="" />
        <AvatarFallback>{avatarName}</AvatarFallback>
      </Avatar>
      <span className="min-w-0 flex-1 truncate text-sm font-medium">
        {userName}
      </span>
    </div>
  );
};
