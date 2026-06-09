export type NavigationViewItem = {
  id: string;
  name: string;
  icon: string;
};

export type NavigationSubheader = {
  filters: boolean;
  grid: boolean;
  view?: NavigationViewItem[];
};

export type NavigationMenuItem = {
  id: string;
  name: string;
  slug: string;
  colorId: string;
  icon: string;
  subheader: NavigationSubheader;
};

export type FolderItemProps = Pick<
  NavigationMenuItem,
  'id' | 'name' | 'slug' | 'icon'
>;

export type NavigationMenu = {
  menu: NavigationMenuItem[];
};
