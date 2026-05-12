export const getNextColumn = (currentColumn: string) => {
  const TRANSITIONS: Record<string, string> = {
    planning: 'upcoming',
    upcoming: 'completed',
    completed: 'completed',
  };

  return TRANSITIONS[currentColumn] ?? currentColumn;
};
