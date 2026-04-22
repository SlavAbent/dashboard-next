export const getCurrentPath = (pathname: string): string | null => {
  if (!pathname) {
    return null;
  }
  const parts = pathname.split('/').filter(Boolean);
  return parts[0] ?? null;
};
