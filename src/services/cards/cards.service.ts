import { CardsListResponse, GetCardsArgs } from '@/services/cards/cards.types'
import { flashcardsApi } from '@/services/flashcards-api'

export const cardsService = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCards: builder.query<CardsListResponse, GetCardsArgs>({
        providesTags: ['Cards'],

        query: ({ id, ...args }) => ({
          params: args,
          url: `v1/decks/${id}/cards`,
        }),
      }),
    }
  },
})

export const { useGetCardsQuery } = cardsService
