import type { Meta, StoryObj } from '@storybook/react'

import { Rating } from './'

const meta = {
  component: Rating,
  tags: ['autodocs'],
  title: 'Components/Rating',
} satisfies Meta<typeof Rating>

export default meta
type Story = StoryObj<typeof meta>

export const RatingZero: Story = {
  args: {
    value: 0,
  },
}

export const RatingOne: Story = {
  args: {
    value: 1,
  },
}

export const RatingTwo: Story = {
  args: {
    value: 2,
  },
}

export const RatingThree: Story = {
  args: {
    value: 3,
  },
}

export const RatingFour: Story = {
  args: {
    value: 4,
  },
}

export const RatingFive: Story = {
  args: {
    value: 5,
  },
}
