import type { Meta, StoryObj } from '@storybook/react'

import { TabType, Tabs } from './tabs'

const meta = {
  component: Tabs,
  tags: ['autodocs'],
  title: 'Components/Tabs',
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const tabsItems: TabType[] = [
  {
    title: 'Switch 1',
    value: 'Switch 1',
  },
  {
    title: 'Switch 2',
    value: 'Switch 2',
  },
  {
    title: 'Switch 3',
    value: 'Switch 3',
  },
  {
    disabled: true,
    title: 'Switch 4',
    value: 'Switch 4',
  },
]

export const TabsDemo: Story = {
  args: {
    tabs: tabsItems,
  },
}
