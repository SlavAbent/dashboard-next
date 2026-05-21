import React from 'react';
import { TypographyP } from '@/shared/ui/Typography/TypographyP';
import { cn } from '@/shared/lib/cn';
import { Checkbox } from '@/shared/ui/checkbox';
import FolderDropdown from '@/widgets/Folder/FolderDropdown';
import { useBoardStore } from '@/entities/board/model/useDataStore';
import { useModalStore } from '@/entities/modal/model/modal.store';

const disabled = false;

const FolderContent = ({
  folderId,
  columnId,
  title,
}: {
  folderId: number;
  columnId: string;
  title: string;
}) => {
  const moveFolder = useBoardStore((state) => state.moveFolder);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <div
      className={cn(
        'flex items-center rounded-sm border px-5 py-[18px]',
        disabled && 'cursor-not-allowed'
      )}>
      <div
        className="flex grow cursor-pointer items-center gap-4"
        onClick={openModal}>
        <Checkbox
          checked={columnId === 'completed'}
          onCheckedChange={() => moveFolder(folderId, columnId)}
        />
        <TypographyP text={title} />
      </div>
      <FolderDropdown folderId={folderId} columnId={columnId} />
    </div>
  );
};

export default FolderContent;
