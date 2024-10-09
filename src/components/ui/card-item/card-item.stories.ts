import type { Meta, StoryObj } from '@storybook/react'

import { Card } from '@/services/cards/cards.types'

import { CardItem } from './'

const meta = {
  component: CardItem,
  tags: ['autodocs'],
  title: 'Components/CardItem',
} satisfies Meta<typeof CardItem>

export default meta
type Story = StoryObj<typeof meta>

export const CardItemComponent: Story = {
  args: {
    card: {
      answer: 'answer',
      answerImg: 'string',
      answerVideo: 'string',
      created: '12.03.2024',
      deckId: 'string',
      grade: 3,
      id: 'string',
      question: 'question',
      questionImg: 'string',
      questionVideo: 'string',
      shots: 2,
      updated: '12.03.2024',
      userId: 'string',
    },
    deleteCardHandler: (card: Card) => {
      console.log(card)
    },
    myPack: true,
    updateCardHandler: (card: Card) => {
      console.log(card)
    },
  },
}
