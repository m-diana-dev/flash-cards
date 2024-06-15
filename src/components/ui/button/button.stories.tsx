import type { Meta, StoryObj } from '@storybook/react'

import Logout from '@/images/icons/Logout'

import { Button } from './'

const meta = {
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const ButtonPrimary: Story = {
  args: {
    children: 'Button primary',
    variant: 'primary',
  },
}

export const ButtonPrimaryDisabled: Story = {
  args: {
    children: 'Button primary',
    disabled: true,
    variant: 'primary',
  },
}

export const ButtonPrimaryWithIcon: Story = {
  args: {
    children: (
      <>
        <Logout />
        Button primary
      </>
    ),
    variant: 'primary',
  },
}

export const ButtonPrimaryWithIconDisabled: Story = {
  args: {
    children: (
      <>
        <Logout />
        Button primary
      </>
    ),
    disabled: true,
    variant: 'primary',
  },
}

export const ButtonSecondary: Story = {
  args: {
    children: 'Button Secondary',
    variant: 'secondary',
  },
}

export const ButtonSecondaryDisabled: Story = {
  args: {
    children: 'Button Secondary',
    disabled: true,
    variant: 'secondary',
  },
}

export const ButtonSecondaryWithIcon: Story = {
  args: {
    children: (
      <>
        <Logout />
        Button primary
      </>
    ),
    variant: 'secondary',
  },
}

export const ButtonSecondaryWithIconDisabled: Story = {
  args: {
    children: (
      <>
        <Logout />
        Button primary
      </>
    ),
    disabled: true,
    variant: 'secondary',
  },
}

export const ButtonFullWidth: Story = {
  args: {
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true,
    variant: 'primary',
  },
}

export const AsLink: Story = {
  args: {
    as: 'a',
    children: 'Link that',
    to: 'https://google.com',
    variant: 'link',
  },
}
