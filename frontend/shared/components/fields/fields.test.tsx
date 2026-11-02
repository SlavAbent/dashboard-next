import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';

import { ErrorField } from './errorField';
import { InputField } from './inputField';
import { SubmitButton } from './submitButton';

type FormValues = { title: string };

function TestForm({ onSubmit }: { onSubmit: (values: FormValues) => void }) {
  const methods = useForm<FormValues>();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <InputField<FormValues> value="title" placeholder="Task title" />
        <SubmitButton isEditMode={false} isSubmitting={false} />
      </form>
    </FormProvider>
  );
}

describe('form components', () => {
  it('submits the value entered by the user', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(<TestForm onSubmit={onSubmit} />);
    await user.type(screen.getByPlaceholderText('Task title'), 'Plan tests');
    await user.click(screen.getByRole('button', { name: 'Create' }));

    expect(onSubmit).toHaveBeenCalledWith(
      { title: 'Plan tests' },
      expect.anything()
    );
  });

  it('renders a field error only when it exists', () => {
    const { rerender } = render(<ErrorField error={undefined} />);

    expect(screen.queryByText('Required field')).not.toBeInTheDocument();
    rerender(
      <ErrorField error={{ type: 'required', message: 'Required field' }} />
    );
    expect(screen.getByText('Required field')).toBeVisible();
  });

  it.each([
    [false, false, 'Create', false],
    [true, false, 'Save', false],
    [true, true, 'Saving...', true],
  ])(
    'shows the correct SubmitButton state',
    (isEditMode, isSubmitting, label, disabled) => {
      render(
        <SubmitButton isEditMode={isEditMode} isSubmitting={isSubmitting} />
      );

      const button = screen.getByRole('button', { name: label });
      expect(button).toHaveProperty('disabled', disabled);
    }
  );
});
