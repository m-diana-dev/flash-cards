import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from '@/components/ui/input/input'

const meta = {
  argTypes: {
    error: { control: 'text' },
    label: { control: 'text' },
    spanClassName: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email'],
    },
    value: { control: 'text' },
  },
  component: TextField,
  title: 'Components/SuperInputText',
} satisfies Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof meta>

export const PasswordInput: Story = {
  args: {
    id: 'super-input-password',
    label: 'Password',
    type: 'password',
  },
}

export const EmailInput: Story = {
  args: {
    id: 'super-input-email',
    label: 'Email',
    type: 'email',
  },
}

export const SearchInput: Story = {
  args: {
    disabled: true,
    id: 'super-input-search',
    onReset: () => {},
    type: 'text',
  },
}

export const InputWithError: Story = {
  args: {
    error: 'Error',
    id: 'super-input-error',
    type: 'text',
  },
}
export const InputDisable: Story = {
  args: {
    disabled: true,
    id: 'super-input-error',
    type: 'text',
  },
}
