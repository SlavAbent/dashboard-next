import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

const mockAddFolder = jest.fn();
const mockTaskFolders = [
  { id: 'folder-1', title: 'Inbox', columnId: 'upcoming', order: 1 },
  { id: 'folder-2', title: 'Doing', columnId: 'in-progress', order: 1 },
];

jest.mock('@/shared/ui/index', () => {
  const React = jest.requireActual<typeof import('react')>('react');
  const NativeSelect = React.forwardRef<
    HTMLSelectElement,
    React.ComponentProps<'select'> & { containerClassName?: string }
  >(({ containerClassName, ...props }, ref) => {
    void containerClassName;
    return React.createElement('select', { ...props, ref });
  });
  NativeSelect.displayName = 'NativeSelectMock';

  return {
    Button: (
      props: React.ComponentProps<'button'> & {
        variant?: string;
        size?: string;
      }
    ) => {
      const { variant, size, ...buttonProps } = props;
      void variant;
      void size;
      return React.createElement('button', buttonProps);
    },
    Input: (props: React.ComponentProps<'input'>) =>
      React.createElement('input', props),
    NativeSelect,
    Calendar: () => React.createElement('div', { role: 'grid' }),
    CalendarIcon: () => React.createElement('span', { 'aria-hidden': true }),
    Popover: ({ children }: React.PropsWithChildren) => children,
    PopoverContent: ({ children }: React.PropsWithChildren) =>
      React.createElement('div', null, children),
    PopoverTrigger: ({
      render,
      children,
    }: React.PropsWithChildren<{ render: React.ReactElement }>) =>
      React.cloneElement(render, {}, children),
  };
});

jest.mock('@/entities/board', () => {
  const actual =
    jest.requireActual<typeof import('@/entities/board')>('@/entities/board');

  return {
    ...actual,
    useBoardStore: (
      selector: (state: {
        columns: Array<{ id: string; title: string }>;
        taskFolders: Array<{
          id: string;
          title: string;
          columnId: string;
          order: number;
        }>;
        addFolder: typeof mockAddFolder;
      }) => unknown
    ) =>
      selector({
        columns: [
          { id: 'planning', title: 'Planning' },
          { id: 'upcoming', title: 'Upcoming' },
          { id: 'in-progress', title: 'In progress' },
        ],
        taskFolders: mockTaskFolders,
        addFolder: mockAddFolder,
      }),
  };
});

import { ColumnSelect } from '@/features/boardModal/ui/columnSelect';
import { DateRangeField } from '@/features/boardModal/ui/dateRangeField';
import { PriorityField } from '@/features/boardModal/ui/priorityField';
import { SelectField } from '@/features/boardModal/ui/selectField';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@/shared/components/drawer/drawer';
import type { Priority } from '@/shared/model/schedule';

type Values = {
  taskValue: string;
  folderId: string;
  columnId: string;
  completed: boolean;
  startDate: string | null;
  endDate: string | null;
  priority: Priority;
};

const TestForm = ({ onChange }: { onChange: (values: Values) => void }) => {
  const methods = useForm<Values>({
    defaultValues: {
      taskValue: '',
      folderId: 'folder-1',
      columnId: 'upcoming',
      completed: false,
      startDate: '2026-11-05',
      endDate: '2026-11-12',
      priority: 'high',
    },
  });
  const values = useWatch({ control: methods.control });

  useEffect(() => {
    onChange(values as Values);
  }, [onChange, values]);

  return (
    <Drawer open swipeDirection="right">
      <DrawerContent>
        <DrawerTitle>Тестовая форма</DrawerTitle>
        <DrawerDescription>Проверка полей</DrawerDescription>
        <FormProvider {...methods}>
          <ColumnSelect />
          <SelectField defaultNewFolderColumnId="planning" />
          <DateRangeField />
          <PriorityField />
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
};

describe('board modal schedule fields', () => {
  beforeEach(() => {
    mockTaskFolders.splice(
      0,
      mockTaskFolders.length,
      { id: 'folder-1', title: 'Inbox', columnId: 'upcoming', order: 1 },
      { id: 'folder-2', title: 'Doing', columnId: 'in-progress', order: 1 }
    );
    mockAddFolder.mockReset().mockImplementation(async (folder) => {
      const createdFolder = {
        ...folder,
        id: 'folder-new',
      };
      mockTaskFolders.push(createdFolder);
      return createdFolder;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const createdFolder = {
    id: 'folder-new',
    title: 'Calendar',
    columnId: 'planning',
    order: 1,
    startDate: null,
    endDate: null,
    priority: 'none',
  } as const;

  it('shows the saved range and clears both dates through a user action', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<TestForm onChange={onChange} />);

    expect(
      screen.getByRole('button', { name: /05\.11\.2026 — 12\.11\.2026/ })
    ).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Priority' })).toHaveValue(
      'high'
    );

    await user.click(screen.getByRole('button', { name: 'Clear' }));

    expect(
      screen.getByRole('button', { name: /Select due date/ })
    ).toBeInTheDocument();
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ startDate: null, endDate: null })
    );
  });

  it('changes priority inside the drawer', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<TestForm onChange={onChange} />);

    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Priority' }),
      'medium'
    );

    expect(screen.getByRole('combobox', { name: 'Priority' })).toHaveValue(
      'medium'
    );
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ priority: 'medium' })
    );
  });

  it('changes the folder column inside the drawer', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<TestForm onChange={onChange} />);

    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Column' }),
      'in-progress'
    );

    expect(screen.getByRole('combobox', { name: 'Column' })).toHaveValue(
      'in-progress'
    );
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ columnId: 'in-progress' })
    );
  });

  it('filters folders after selecting a task section', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<TestForm onChange={onChange} />);

    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Section' }),
      'in-progress'
    );

    expect(screen.getByRole('combobox', { name: 'Folder' })).toHaveValue(
      'folder-2'
    );
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        columnId: 'in-progress',
        folderId: 'folder-2',
      })
    );
  });

  it('creates a folder in the selected section from the task form', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<TestForm onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: 'Add folder' }));
    expect(
      screen.getByRole('combobox', { name: 'Section for new folder' })
    ).toHaveValue('planning');
    await user.type(
      screen.getByRole('textbox', { name: 'Folder name' }),
      'New'
    );
    await user.click(screen.getByRole('button', { name: 'Create' }));

    await waitFor(() =>
      expect(mockAddFolder).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'New',
          columnId: 'planning',
          order: 1,
          priority: 'none',
        })
      )
    );

    await waitFor(() =>
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          columnId: 'planning',
          folderId: 'folder-new',
        })
      )
    );
  });

  it('clears the folder draft after canceling creation', async () => {
    const user = userEvent.setup();

    render(<TestForm onChange={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Add folder' }));
    await user.type(
      screen.getByRole('textbox', { name: 'Folder name' }),
      'Draft'
    );
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    await user.click(screen.getByRole('button', { name: 'Add folder' }));

    expect(screen.getByRole('textbox', { name: 'Folder name' })).toHaveValue(
      ''
    );
  });

  it('shows an error and enables the form after folder creation fails', async () => {
    const user = userEvent.setup();
    mockAddFolder.mockRejectedValueOnce(new Error('Request failed'));

    render(<TestForm onChange={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Add folder' }));
    await user.type(
      screen.getByRole('textbox', { name: 'Folder name' }),
      'Broken'
    );
    await user.click(screen.getByRole('button', { name: 'Create' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Failed to create folder'
    );
    expect(screen.getByRole('button', { name: 'Create' })).toBeEnabled();
  });

  it('ignores a stale creation result after canceling the request', async () => {
    const user = userEvent.setup();
    let resolveFolder: ((folder: typeof createdFolder) => void) | undefined;
    mockAddFolder.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveFolder = resolve;
        })
    );

    render(<TestForm onChange={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Add folder' }));
    await user.type(
      screen.getByRole('textbox', { name: 'Folder name' }),
      'Pending'
    );
    await user.click(screen.getByRole('button', { name: 'Create' }));
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    await user.click(screen.getByRole('button', { name: 'Add folder' }));
    await user.type(
      screen.getByRole('textbox', { name: 'Folder name' }),
      'Fresh'
    );

    await act(async () => resolveFolder?.(createdFolder));

    expect(screen.getByRole('textbox', { name: 'Folder name' })).toHaveValue(
      'Fresh'
    );
  });
});
