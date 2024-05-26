import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './'

const meta = {
  component: Typography,
  tags: ['autodocs'],
  title: 'Components/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const H1: Story = {
  args: {
    as: 'h1',
    children: 'Title 1',
    variant: 'h1',
  },
}
export const H2: Story = {
  args: {
    as: 'h2',
    children: 'Title 2',
    variant: 'h2',
  },
}
export const H3: Story = {
  args: {
    as: 'h3',
    children: 'Title 3',
    variant: 'h3',
  },
}
export const H4: Story = {
  args: {
    as: 'h4',
    children: 'Title 4',
    variant: 'h4',
  },
}
export const body1: Story = {
  args: {
    children: 'Body 1',
    variant: 'body1',
  },
}
export const body2: Story = {
  args: {
    children: 'Body 2',
    variant: 'body2',
  },
}
export const subtitle1: Story = {
  args: {
    as: 'div',
    children: 'Subtitle 1',
    variant: 'subtitle1',
  },
}
export const subtitle2: Story = {
  args: {
    as: 'div',
    children: 'Subtitle 2',
    variant: 'subtitle2',
  },
}
export const link1: Story = {
  args: {
    as: 'a',
    children: 'Link 1',
    href: '#',
    variant: 'link1',
  },
}
export const link2: Story = {
  args: {
    as: 'a',
    children: 'Link 2',
    href: '#',
    variant: 'link2',
  },
}
export const Caption: Story = {
  args: {
    as: 'label',
    children: 'Caption',
    variant: 'caption',
  },
}
export const Overline: Story = {
  args: {
    as: 'label',
    children: 'Overline',
    variant: 'overline',
  },
}
