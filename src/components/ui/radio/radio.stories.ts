import type { Meta, StoryObj } from '@storybook/react'

import { RadioItemType } from '@/components/ui/radio/radioItem/radioItem'

import { Radio } from './'

const meta = {
  component: Radio,
  tags: ['autodocs'],
  title: 'Components/Radio',
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

const radioItems: RadioItemType[] = [
  { title: 'Option 1', value: '1' },
  { title: 'Option 2', value: '2' },
  { title: 'Option 3', value: '3' },
]

const radioItemsWithDisabled: RadioItemType[] = [
  { disabled: true, title: 'Option 1', value: '1' },
  { title: 'Option 2', value: '2' },
  { title: 'Option 3', value: '3' },
]

export const RadioDefault: Story = {
  args: {
    items: radioItems,
  },
}

export const RadioWithDisabledItem: Story = {
  args: {
    items: radioItemsWithDisabled,
  },
}
