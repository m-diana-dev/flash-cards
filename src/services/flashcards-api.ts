import {
  CreateDeckArgs,
  Deck,
  DecksListResponse,
  GetDecksArgs,
  MinMaxCardsCount,
} from '@/services/decks/decks.types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const flashcardsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  endpoints: builder => {
    return {
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/decks`,
        }),
      }),
      getDecks: builder.query<DecksListResponse, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: args => ({
          params: args ?? undefined,
          url: `v2/decks`,
        }),
      }),
      getMinMaxCards: builder.query<MinMaxCardsCount, void>({
        query: () => `v2/decks/min-max-cards`,
      }),
    }
  },
  reducerPath: 'flashcardsApi',
  tagTypes: ['Decks'],
})

export const { useCreateDeckMutation, useGetDecksQuery, useGetMinMaxCardsQuery } = flashcardsApi
