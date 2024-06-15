import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './'

const meta = {
  argTypes: {
    variant: {
      options: ['div', 'section', 'dayTheme', 'nightTheme'],
    },
  },
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

// 1 - стандартная
// 2 - c disabled

export const Light: Story = {
  args: {
    children: (
      <p>
        <div>Light</div>
      </p>
    ),
    isDark: false,
    maxWidth: '300px',
    variant: 'primary',
  },
}

export const Dark: Story = {
  args: {
    children: (
      <p>
        <div>Dark</div>
      </p>
    ),
    isDark: true,
    maxWidth: '300px',
    variant: 'primary',
  },
}

export const CardAsDiv: Story = {
  args: {
    as: 'div',
    children: 'div',
    variant: 'primary',
  },
}

export const CardAsSection: Story = {
  args: {
    as: 'section',
    children: 'section',
    variant: 'primary',
  },
}
