export type DurationType = 5 | 10 | 25;

export type PomodoroState = {
  selectedMin: DurationType;
  totalSeconds: number;
  remaining: number;
  running: boolean;
};

export type PomodoroStore = PomodoroState & {
  setMode: (min: DurationType) => void;
  startPause: () => void;
  reset: () => void;
  tick: () => void;
};
