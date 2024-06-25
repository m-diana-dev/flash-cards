import type { Meta, StoryObj } from '@storybook/react'

import { withRouter } from 'storybook-addon-remix-react-router'

import { CreatePassword, FormValues } from './create-password'

const meta = {
  component: CreatePassword,
  decorators: [withRouter],
  tags: ['autodocs'],
  title: 'Auth/CreatePassword',
} satisfies Meta<typeof CreatePassword>

export default meta
type Story = StoryObj<typeof meta>

export const CreatePasswordForm: Story = {
  args: {
    onSubmit: (data: FormValues) => {
      console.log(data)
    },
  },
}
