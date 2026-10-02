export const formatedTitle = (segment: string): string => {
  if (!segment) return 'Not Found';

  return `${segment.charAt(0).toUpperCase()}${segment.slice(1)}`;
};
