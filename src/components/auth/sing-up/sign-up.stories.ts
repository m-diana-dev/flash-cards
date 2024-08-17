import type { Meta, StoryObj } from '@storybook/react'

import { FormValues, SignUp } from '@/components/auth/sing-up/sign-up'
import { withRouter } from 'storybook-addon-remix-react-router'

const meta = {
  component: SignUp,
  decorators: [withRouter],
  tags: ['autodocs'],
  title: 'Auth/SignUp',
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>
const handleSignUp = (data: Omit<FormValues, 'confirmPassword'>) => {
  console.log('Form Data:', data)
}

export const SignUpForm: Story = {
  args: {
    onSubmit: handleSignUp,
  },
}
