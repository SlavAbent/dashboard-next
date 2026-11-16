import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NativeSelect } from '@/shared/components/nativeSelect/nativeSelect';

describe('NativeSelect', () => {
  it('renders and changes its value', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <NativeSelect aria-label="Test select" onChange={onChange}>
        <option value="one">One</option>
        <option value="two">Two</option>
      </NativeSelect>
    );

    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Test select' }),
      'two'
    );

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
