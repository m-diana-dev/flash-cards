import type { Meta, StoryObj } from '@storybook/react'

import { SubmitHandler } from 'react-hook-form'

import { FormValues, SignIn } from '@/components/auth/sing-in/sign-in'
import { withRouter } from 'storybook-addon-remix-react-router'

const meta = {
  component: SignIn,
  decorators: [withRouter],
  tags: ['autodocs'],
  title: 'Auth/SignIn',
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>
const handleSignIn: SubmitHandler<FormValues> = data => {
  console.log('Form Data:', data)
}

export const SignInForm: Story = {
  args: {
    onSubmit: handleSignIn,
  },
}
