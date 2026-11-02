import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormProvider, useForm } from 'react-hook-form';

import { ErrorField } from './errorField';
import { InputField } from './inputField';
import { SubmitButton } from './submitButton';

type ExampleForm = {
  title: string;
};

const FieldsExample = ({ isEditMode = false }) => {
  const methods = useForm<ExampleForm>({
    defaultValues: {
      title: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <form className="flex w-80 flex-col gap-3">
        <InputField<ExampleForm> value="title" placeholder="Task name" />
        <ErrorField
          error={{ message: 'Example validation error', type: 'required' }}
        />
        <SubmitButton isEditMode={isEditMode} isSubmitting={false} />
      </form>
    </FormProvider>
  );
};

const meta = {
  title: 'Shared/Fields',
  component: InputField,
  args: {
    placeholder: 'Task name',
    value: 'title',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Fields объединяет InputField, ErrorField и SubmitButton для форм на базе React Hook Form.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Create: Story = {
  render: () => <FieldsExample />,
};

export const Edit: Story = {
  render: () => <FieldsExample isEditMode />,
};

export const Submitting: Story = {
  render: () => (
    <div className="w-80">
      <SubmitButton isEditMode={false} isSubmitting />
    </div>
  ),
};
