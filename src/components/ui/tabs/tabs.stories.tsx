import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '@/components/ui/typography'

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
    content: (
      <div>
        <Typography as={'h1'} variant={'h1'}>
          Title
        </Typography>
      </div>
    ),
    title: 'Switch 1',
    value: 'Switch 1',
  },
  {
    content: (
      <div>
        <Typography as={'h1'} variant={'h1'}>
          Title 2
        </Typography>
      </div>
    ),
    title: 'Switch 2',
    value: 'Switch 2',
  },
  {
    content: (
      <div>
        <Typography as={'h1'} variant={'h1'}>
          Title 3
        </Typography>
      </div>
    ),
    title: 'Switch 3',
    value: 'Switch 3',
  },
  {
    content: (
      <div>
        <Typography as={'h1'} variant={'h1'}>
          Title 4
        </Typography>
      </div>
    ),
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
