export type DurationType = 5 | 10 | 25;

export interface PomodoroState {
  selectedMin: DurationType;
  totalSeconds: number;
  remaining: number;
  running: boolean;
}

export interface PomodoroActions {
  setMode: (min: DurationType) => void;
  startPause: () => void;
  reset: () => void;
  tick: () => void;
}

export type PomodoroStore = PomodoroState & PomodoroActions;
