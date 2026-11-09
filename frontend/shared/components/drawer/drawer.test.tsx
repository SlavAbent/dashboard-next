import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/shared/components/drawer/drawer';

const DrawerHarness = () => {
  const [open, setOpen] = useState(true);

  return (
    <Drawer open={open} swipeDirection="right" onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Новая задача</DrawerTitle>
          <DrawerDescription>Заполните данные задачи</DrawerDescription>
          <DrawerCloseButton />
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

describe('Drawer', () => {
  it('renders as an accessible dialog and closes through its button', async () => {
    const user = userEvent.setup();

    render(<DrawerHarness />);

    expect(screen.getByRole('dialog', { name: 'Новая задача' })).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog', { name: 'Новая задача' })).toBeNull();
  });
});
