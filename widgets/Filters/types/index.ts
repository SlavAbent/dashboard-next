export type FilterType = {
  id: string | number;
  name: string;
  icon: string;
};

export type FiltersCreateType = {
  data: {
    tasks: FilterType[];
  };
};
