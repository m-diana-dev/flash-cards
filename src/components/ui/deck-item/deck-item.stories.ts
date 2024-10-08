import type { Meta, StoryObj } from '@storybook/react'

import { Deck } from '@/services/decks/decks.types'
import { withRouter } from 'storybook-addon-remix-react-router'

import { DeckItem } from './'

const meta = {
  component: DeckItem,
  decorators: [withRouter],
  tags: ['autodocs'],
  title: 'Components/DeckItem',
} satisfies Meta<typeof DeckItem>

export default meta
type Story = StoryObj<typeof meta>

export const DeckItemComponent: Story = {
  args: {
    createFavoriteDeck: ({ id }) => {
      console.log(id)
    },
    deck: {
      author: { id: 'dfasdfsafd', name: 'AuthorName' },
      cardsCount: 10,
      created: '12.09.2024',
      id: 'string',
      isFavorite: true,
      isPrivate: true,
      name: 'Name',
      updated: '12.09.2024',
      userId: 'string',
    },
    deleteDeckHandler: (deck: Deck) => {
      console.log(deck)
    },
    deleteFavoriteDeck: ({ id }) => {
      console.log(id)
    },
    updateDeckHandler: (deck: Deck) => {
      console.log(deck)
    },
    userId: 'string',
  },
}
