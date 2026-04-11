'use client';

import Card from '@/app/shared/ui/Card';
import CardItem from '@/app/shared/ui/CardItem';
import { SvgIcon } from '@/app/shared/ui/SvgIcon';
import { useAsideStore } from '@/app/shared/store/aside.store';

type Folder = {
  id: string | number;
  name: string;
  colorId: string;
  icon: string;
};

type Props = {
  data: {
    menu: Folder[];
  };
};

const FoldersCreate = ({ data }: Props) => {
  const collapsed = useAsideStore((state) => state.collapsed);

  const handleClickToFolder = (folderId: string | number) => {
    console.log('Clicked folder:', folderId);
  };

  return (
    <Card>
      {data.menu.map((folder) => (
        <CardItem
          key={folder.id}
          className="group"
          onClick={() => handleClickToFolder(folder.id)}>
          <SvgIcon
            icon={folder.icon}
            className={`text-[#727272] transition-colors group-hover:text-black ${collapsed ? 'mr-0' : 'mr-5'}`}
          />
          <span
            className={`overflow-hidden whitespace-nowrap transition-all ${
              collapsed
                ? 'ml-0 max-w-0 opacity-0'
                : 'text-neutral-80 ml-3 max-w-[150px] text-sm opacity-100 duration-150 group-hover:text-black'
            }`}>
            {folder.name}
          </span>
        </CardItem>
      ))}
    </Card>
  );
};

export default FoldersCreate;
