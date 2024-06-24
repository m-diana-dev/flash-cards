import type { Meta, StoryObj } from '@storybook/react'

import { withRouter } from 'storybook-addon-remix-react-router'

import { ForgotPassword, FormValues } from './forgot-password'

const meta = {
  component: ForgotPassword,
  decorators: [withRouter],
  tags: ['autodocs'],
  title: 'Auth/ForgotPassword',
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>

export const ForgotPasswordForm: Story = {
  args: {
    onSubmit: (data: FormValues) => {
      console.log(data)
    },
  },
}
