import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  FormProvider,
  type Resolver,
  type ResolverResult,
  useForm,
} from 'react-hook-form';

import { ErrorField } from './errorField';
import { InputField } from './inputField';
import { SubmitButton } from './submitButton';

type FormValues = { title: string };

const requiredTitleResolver: Resolver<FormValues> = async (
  values
): Promise<ResolverResult<FormValues>> => {
  if (values.title) {
    return { values, errors: {} };
  }

  return {
    values: {},
    errors: {
      title: { type: 'required', message: 'Folder name is required' },
    },
  };
};

function TestForm({
  onSubmit,
  required = false,
}: {
  onSubmit: (values: FormValues) => void;
  required?: boolean;
}) {
  const methods = useForm<FormValues>({
    resolver: required ? requiredTitleResolver : undefined,
  });

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

  it('keeps the input enabled after an invalid submit', async () => {
    const user = userEvent.setup();

    render(<TestForm required onSubmit={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Create' }));

    const input = screen.getByPlaceholderText('Task title');
    expect(screen.getByText('Folder name is required')).toBeVisible();
    expect(input).toBeEnabled();

    await user.type(input, 'New folder');

    expect(input).toHaveValue('New folder');
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
