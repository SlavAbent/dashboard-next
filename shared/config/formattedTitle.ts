export const formatedTitle = (segment: string): string => {
  if (!segment) return 'Home';

  return `${segment.charAt(0).toUpperCase()}${segment.slice(1)}`;
};
