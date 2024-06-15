import type { Meta, StoryObj } from '@storybook/react'

import { UserDropdown } from '@/components/layout/header/user-dropdown/user-dropdown'

const meta = {
  component: UserDropdown,
  tags: ['autodocs'],
  title: 'Components/DropDown',
} satisfies Meta<typeof UserDropdown>

export default meta
type Story = StoryObj<typeof meta>

const user = {
  email: 'sdsdadas@gmail.com',
  photo: {
    alt: 'd',
    src: 'https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288872.jpg?t=st=1717059140~exp=1717062740~hmac=ded8e9886d1e2ce436357fca0c4af8864b985d5a72da7ddf7e30524e709bd6c9&w=740',
  },
  userName: 'Artsiom',
}

export const WorkMenuWithoutImages: Story = {
  args: {
    email: user.email,
    name: user.userName,
    photo: '',
    photoDesc: user.photo.alt,
  },
}

export const WorkMenuWithImages: Story = {
  args: {
    email: user.email,
    name: user.userName,
    photo: user.photo.src,
    photoDesc: user.photo.alt,
  },
}
