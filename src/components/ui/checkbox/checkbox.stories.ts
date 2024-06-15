import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './'

const meta = {
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const CheckboxDefault: Story = {
  args: {
    defaultChecked: true,
  },
}

export const CheckboxUnchecked: Story = {
  args: {
    defaultChecked: false,
  },
}

export const CheckboxWithLabel: Story = {
  args: {
    defaultChecked: true,
    label: 'Check-box',
  },
}

export const CheckboxWithLabelUnchecked: Story = {
  args: {
    defaultChecked: false,
    label: 'Check-box',
  },
}

export const CheckboxDisabled: Story = {
  args: {
    disabled: true,
    id: 's_3',
  },
}

export const CheckboxDisabledUnchecked: Story = {
  args: {
    defaultChecked: true,
    disabled: true,
  },
}

export const CheckboxWithLabelDisabled: Story = {
  args: {
    defaultChecked: false,
    disabled: true,
    label: 'Check-box',
  },
}

export const CheckboxWithLabelDisabledUnchecked: Story = {
  args: {
    defaultChecked: true,
    disabled: true,
    label: 'Check-box',
  },
}
