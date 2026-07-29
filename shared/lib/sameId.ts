export type EntityId = string;

export const toIdString = (id: EntityId | null | undefined): string => id ?? '';

export const sameId = (
  a: EntityId | null | undefined,
  b: EntityId | null | undefined
): boolean => {
  if (a == null || b == null) return false;

  return a === b;
};
