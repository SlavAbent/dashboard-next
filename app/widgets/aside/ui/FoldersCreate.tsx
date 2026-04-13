'use client';

import Card from '@/app/shared/ui/Card';
import CardItem from '@/app/shared/ui/CardItem';
import { SvgIcon } from '@/app/shared/ui/SvgIcon';
import { useAsideStore } from '@/app/shared/store/aside.store';
import { FolderCreateType } from '@/app/widgets/aside/types';

const FoldersCreate = ({ data }: FolderCreateType) => {
  const collapsed = useAsideStore((state) => state.collapsed);

  const handleClickToFolder = (folderId: string | number) => {
    console.log(folderId);
  };

  return (
    <Card className={collapsed ? 'px-0' : ''}>
      {data.menu.map((folder) => (
        <CardItem
          key={folder.id}
          onClick={() => handleClickToFolder(folder.id)}
          className={`group flex items-center overflow-hidden transition-all duration-300 ease-in-out ${
            collapsed
              ? 'h-9 w-9 justify-center gap-0 p-0'
              : 'w-[216px] justify-start gap-3 px-4'
          }`}>
          <div className="flex h-5 w-5 shrink-0 items-center justify-center">
            <SvgIcon
              icon={folder.icon}
              className="text-[#727272] transition-colors duration-300 group-hover:text-black"
            />
          </div>

          <span
            className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${
              collapsed
                ? 'ml-0 max-w-0 opacity-0'
                : 'text-neutral-80 max-w-[150px] text-sm opacity-100 group-hover:text-black'
            }`}>
            {folder.name}
          </span>
        </CardItem>
      ))}
    </Card>
  );
};

export default FoldersCreate;
