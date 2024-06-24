import { Meta, StoryObj } from '@storybook/react'
import { withRouter } from 'storybook-addon-remix-react-router'

import { CheckEmail } from './check-email'

const meta = {
  component: CheckEmail,
  decorators: [withRouter],
  tags: ['autodocs'],
  title: 'Auth/CheckEmail',
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const CheckEmailCard: Story = {
  args: {
    email: 'example@mail.com',
  },
}
