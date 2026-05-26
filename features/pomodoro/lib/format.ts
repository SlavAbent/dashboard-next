export function formatTitle(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function padDuration(min: number): string {
  return String(min).padStart(2, '0') + ':00';
}
