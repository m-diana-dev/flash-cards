import type { Meta, StoryObj } from '@storybook/react'

import { Tabs } from './tabs'

const meta = {
  component: Tabs,
  tags: ['autodocs'],
  title: 'Components/Tab',
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const BaseTab: Story = {
  args: {
    tabs: [
      { title: 'Switch 1', value: 'Switch 1' },
      { title: 'Switch 2', value: 'Switch 2' },
      { title: 'Switch 3', value: 'Switch 3' },
    ],
  },
}

export const BaseTabWithDisabled: Story = {
  args: {
    tabs: [
      { title: 'Switch 1', value: 'Switch 1' },
      { title: 'Switch 2', value: 'Switch 2' },
      { disabled: true, title: 'Switch 3', value: 'Switch 3' },
    ],
  },
}
