export const normalizePath = (pathname: string, name: string) => {
  const href = `/${name.toLowerCase()}`;
  const path = pathname.toLowerCase();
  const isActive = path.startsWith(`/${href}`);

  return {
    isActive,
    href,
  };
};
