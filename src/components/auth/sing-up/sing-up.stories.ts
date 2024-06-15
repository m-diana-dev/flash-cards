import type { Meta, StoryObj } from '@storybook/react'

import { SignUp, SignUpFormType } from '@/components/auth/sing-up/sing-up'

const meta = {
  component: SignUp,
  tags: ['autodocs'],
  title: 'Auth/userRegistration',
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>
const handleSignUp = (data: SignUpFormType) => {
  console.log('Form Data:', data)
}

export const SingUp: Story = {
  args: {
    onSubmit: handleSignUp,
  },
}
