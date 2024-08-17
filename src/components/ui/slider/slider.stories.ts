import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from './slider'

const meta = {
  argTypes: {},
  component: Slider,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const SliderDemo: Story = {
  args: {
    value: [0, 80],
  },
}
