import { render, screen } from '@testing-library/react';
import type { Ref } from 'react';

jest.mock(
  '@dashboard/ui',
  () => ({
    ScheduleMeta: () => null,
    TypographyP: ({ text }: { text: string }) => <p>{text}</p>,
  }),
  { virtual: true }
);

jest.mock('@/shared/ui/index', () => ({
  ScheduleMeta: () => null,
  TypographyP: ({ text }: { text: string }) => <p>{text}</p>,
}));

jest.mock('@/entities/board/model/useFilteredTasks', () => ({
  useFilteredTasks: () => [],
}));

jest.mock('@/features/folderActions', () => ({
  FolderDropdown: () => <button type="button">Действия с карточкой</button>,
}));

jest.mock('@/features/folderTask', () => ({
  FolderTaskList: () => null,
}));

import FolderContent from '@/features/boardFolder/ui/folderContent';

describe('FolderContent', () => {
  it('keeps the actions menu outside the drag handle', () => {
    let dragHandle: HTMLDivElement | null = null;
    const dragHandleRef: Ref<HTMLDivElement> = (node) => {
      dragHandle = node;
    };

    render(
      <FolderContent
        folderId="folder-1"
        columnId="in-progress"
        title="Карточка"
        startDate={null}
        endDate={null}
        priority="critical"
        dragHandleRef={dragHandleRef}
      />
    );

    const menuButton = screen.getByRole('button', {
      name: 'Действия с карточкой',
    });

    expect(dragHandle).not.toBeNull();
    expect(dragHandle).not.toContainElement(menuButton);
    expect(screen.getByText('Higher')).toHaveClass(
      'absolute',
      'bg-[#800020]',
      'text-white'
    );
    expect(screen.getByText('Карточка')).toBeInTheDocument();
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    expect(document.querySelector('[data-folder-id="folder-1"]')).toHaveClass(
      'border-[#800020]/60'
    );
  });
});
