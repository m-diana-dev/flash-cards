import type { Meta, StoryObj } from '@storybook/react'

import avatar from '@/images/profile/avatar.png'

import { PersonalInformation } from './personal-information'

const meta = {
  component: PersonalInformation,
  tags: ['autodocs'],
  title: 'Profile/PersonalInformation',
} satisfies Meta<typeof PersonalInformation>

export default meta
type Story = StoryObj<typeof meta>

export const PersonalInformationCard: Story = {
  args: {
    email: 'j&johnson@gmail.com',
    img: avatar,
    name: 'Ivan',
  },
}

export const PersonalInformationCardEditMode: Story = {
  args: {
    editModeDefault: true,
    email: 'j&johnson@gmail.com',
    img: avatar,
    name: 'Ivan',
  },
}
