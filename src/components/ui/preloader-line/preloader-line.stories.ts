import type { Meta, StoryObj } from '@storybook/react'

import { PreloaderLine } from './'

const meta = {
  component: PreloaderLine,
  tags: ['autodocs'],
  title: 'Components/PreloaderLine',
} satisfies Meta<typeof PreloaderLine>

export default meta
type Story = StoryObj<typeof meta>

export const PreloaderDefault: Story = {
  args: {},
}
