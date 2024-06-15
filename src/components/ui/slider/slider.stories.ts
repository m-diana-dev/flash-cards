import type { Meta, StoryObj } from '@storybook/react'
import { SliderApp } from './slider'

const meta = {
  argTypes: {},
  component: SliderApp,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof SliderApp>

export default meta
type Story = StoryObj<typeof meta>

export const Slider: Story = {
  args: {
    value: [20, 80],
    step: 1,
    max: 99,
  },
}
