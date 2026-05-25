import React from 'react';
import { PomodoroIcon } from '@/shared/icons/ui/Pomodoro';
import { iconSize } from '@/shared/icons/iconSize';

const Pomodoro = () => {
  return (
    <div className="flex h-9 w-9 cursor-pointer items-center justify-center">
      <PomodoroIcon size={iconSize(20)} className="stroke-neutral-80" />
    </div>
  );
};

export default Pomodoro;
