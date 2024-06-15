import type { Meta, StoryObj } from '@storybook/react'

import { TableForStorybook } from './tableForStorybook'

const meta = {
  component: TableForStorybook,
  tags: ['autodocs'],
  title: 'Components/Tables',
} satisfies Meta<typeof TableForStorybook>

export default meta
const Items = [
  { id: 1, name: 'Privet', counterCard: 1, updated: '12/04/2024', by: 'Artsiom' },
  { id: 2, name: 'Hello', counterCard: 44, updated: '13/04/2024', by: 'Vika' },
  { id: 3, name: 'Aga', counterCard: 2, updated: '20/04/2024', by: 'Masha' },
  { id: 4, name: 'Zdarova', counterCard: 10, updated: '12/05/2024', by: 'Vlad' },
]
type Story = StoryObj<typeof meta>

export const BaseTab: Story = {
  args: {
    items: Items,
  },
}
