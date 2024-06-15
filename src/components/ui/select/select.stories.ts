import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './select'

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const selectItems = [
  { title: 'Option 1', value: '1' },
  { title: 'Option 2', value: '2' },
  { title: 'Option 3', value: '3' },
]

const selectSmallItems = [
  { title: '10', value: '10' },
  { title: '20', value: '20' },
  { title: '30', value: '30' },
]

export const SelectDefault: Story = {
  args: {
    items: selectItems,
    placeholder: 'Select-box',
  },
}

export const SelectSmall: Story = {
  args: {
    items: selectSmallItems,
    placeholder: '100',
    variant: 'small',
  },
}

export const SelectDefaultWithLabel: Story = {
  args: {
    items: selectItems,
    label: 'Select-box',
    placeholder: 'Select-box',
  },
}

export const SelectDisabled: Story = {
  args: {
    disabled: true,
    items: selectItems,
    placeholder: 'Select-box',
  },
}

export const SelectWithLabelDisabled: Story = {
  args: {
    disabled: true,
    items: selectItems,
    label: 'Select-box',
    placeholder: 'Select-box',
  },
}
