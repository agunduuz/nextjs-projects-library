export type TabType = 'clock' | 'timer' | 'stopwatch';

export interface TimerState {
  hours: number;
  minutes: number;
  seconds: number;
  isRunning: boolean;
  totalSeconds: number;
}

export interface StopwatchState {
  milliseconds: number;
  isRunning: boolean;
  laps: number[];
}
