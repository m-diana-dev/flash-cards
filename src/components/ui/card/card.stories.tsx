import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './'

const meta = {
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const CardComponentDiv: Story = {
  args: {
    children: (
      <p>
        <div>Div</div>
      </p>
    ),
  },
}

export const CardComponentArticle: Story = {
  args: {
    as: 'article',
    children: (
      <p>
        <div>Article</div>
      </p>
    ),
  },
}
