'use client';

import Card from '@/app/shared/ui/Card';
import CardItem from '@/app/shared/ui/CardItem';
import { SvgIcon } from '@/app/shared/ui/SvgIcon';

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
            className="text-[#727272] transition-colors group-hover:text-black"
          />
          <span className="text-neutral-80 text-sm duration-150 group-hover:text-black">
            {folder.name}
          </span>
        </CardItem>
      ))}
    </Card>
  );
};

export default FoldersCreate;
