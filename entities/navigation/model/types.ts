export type NavigationSubheader = {
  filters: boolean;
  grid: boolean;
};

export type NavigationMenuItem = {
  id: string | number;
  name: string;
  colorId: string;
  icon: string;
  subheader: NavigationSubheader;
};

export type NavigationMenu = {
  menu: NavigationMenuItem[];
};
