export type EntityId = string | number;

export const toIdString = (id: EntityId | null | undefined): string =>
  id == null ? '' : String(id);

export const sameId = (
  a: EntityId | null | undefined,
  b: EntityId | null | undefined
): boolean => {
  if (a == null || b == null) return false;

  return String(a) === String(b);
};
