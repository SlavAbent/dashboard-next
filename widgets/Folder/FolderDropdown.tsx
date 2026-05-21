import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { DotsMenuIcon } from '@/shared/icons/ui/DotsMenuIcon';
import { iconSize } from '@/shared/icons/iconSize';
import { TypographyP } from '@/shared/ui/Typography/TypographyP';
import { useBoardStore } from '@/entities/board/model/useDataStore';

const FolderDropdown = ({
  folderId,
}: {
  folderId: number;
  columnId: string;
}) => {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const removeFolder = useBoardStore((state) => state.removeFolder);

  return (
    <DropdownMenu
      open={openDropdownId === folderId}
      onOpenChange={(isOpen) => setOpenDropdownId(isOpen ? folderId : null)}>
      <DropdownMenuTrigger>
        <div
          role="button"
          className="flex cursor-pointer items-center gap-2 px-1 py-1 transition duration-500 hover:bg-[#F2F2F2]">
          <DotsMenuIcon size={iconSize(20)} />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <TypographyP
              text="Edit"
              className="text-neutral-80 !leading-[145%]"
            />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => removeFolder(folderId)}>
            <TypographyP
              text="Delete"
              className="text-neutral-80 !leading-[145%]"
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FolderDropdown;
