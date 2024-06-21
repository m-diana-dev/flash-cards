import type { Meta, StoryObj } from '@storybook/react'

import Avatar from '@/assets/images/profile/avatar.png'
import { Header } from '@/components/ui/header/header'
import { withRouter } from 'storybook-addon-remix-react-router'

const meta = {
  component: Header,
  decorators: [withRouter],
  tags: ['autodocs'],
  title: 'Components/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderWithAuthorization: Story = {
  args: {
    avatar: Avatar,
    email: 'j&johnson@gmail.com',
    isAuthenticated: true,
    name: 'Ivan',
  },
}

export const HeaderWithoutAuthorization: Story = {
  args: {
    isAuthenticated: false,
  },
}
