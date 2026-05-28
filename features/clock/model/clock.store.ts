import { create } from 'zustand';

let interval: NodeJS.Timeout;

type ClockStore = {
  hours: string;
  minutes: string;
  seconds: string;
  startClock: () => void;
};

const format = (value: number) => {
  return value.toString().padStart(2, '0');
};

export const useClockStore = create<ClockStore>((set) => ({
  hours: '00',
  minutes: '00',
  seconds: '00',

  startClock: () => {
    const update = () => {
      const now = new Date();

      set({
        hours: format(now.getHours()),
        minutes: format(now.getMinutes()),
        seconds: format(now.getSeconds()),
      });
    };

    update();
    clearInterval(interval);
    interval = setInterval(update, 1000);
  },
}));
