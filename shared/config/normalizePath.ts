export const normalizePath = (pathname: string, slug: string) => {
  const href = `/${slug}`;
  const path = pathname.toLowerCase();
  const isActive = path === href || path.startsWith(`${href}/`);

  return {
    isActive,
    href,
  };
};
