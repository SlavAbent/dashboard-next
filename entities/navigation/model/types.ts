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

export type FolderItemProps = Pick<NavigationMenuItem, 'id' | 'name' | 'icon'>;

export type NavigationMenu = {
  menu: NavigationMenuItem[];
};
