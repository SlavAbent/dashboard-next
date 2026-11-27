type OrderedItem = {
  order: number;
};

export const getNextOrder = (items: readonly OrderedItem[]) =>
  Math.max(0, ...items.map((item) => item.order)) + 1;
