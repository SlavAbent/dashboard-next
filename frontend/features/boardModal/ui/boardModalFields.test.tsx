import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

jest.mock('@/shared/ui/index', () => {
  const React = jest.requireActual<typeof import('react')>('react');

  return {
    Button: (props: React.ComponentProps<'button'> & { variant?: string }) => {
      const { variant, ...buttonProps } = props;
      void variant;
      return React.createElement('button', buttonProps);
    },
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

jest.mock('@/entities/board', () => ({
  useBoardStore: (
    selector: (state: {
      columns: Array<{ id: string; title: string }>;
    }) => unknown
  ) =>
    selector({
      columns: [
        { id: 'upcoming', title: 'Upcoming' },
        { id: 'in-progress', title: 'In progress' },
      ],
    }),
}));

import { ColumnSelect } from '@/features/boardModal/ui/columnSelect';
import { DateRangeField } from '@/features/boardModal/ui/dateRangeField';
import { PriorityField } from '@/features/boardModal/ui/priorityField';
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
          <DateRangeField />
          <PriorityField />
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
};

describe('board modal schedule fields', () => {
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
});
