import { Card } from '@/services/cards/cards.types'
import {
  AnswerCardArgs,
  CreateDeckArgs,
  CreateFavoriteArgs,
  Deck,
  DecksListResponse,
  DeleteDeckArgs,
  DeleteFavoriteArgs,
  GetDeckArgs,
  GetDecksArgs,
  LearDeckArgs,
  MinMaxCardsCount,
  UpdateDeckArgs,
} from '@/services/decks/decks.types'
import { flashcardsApi } from '@/services/flashcards-api'

export const decksService = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      answerCard: builder.mutation<Card, AnswerCardArgs>({
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/decks/${args.cardId}/learn`,
        }),
      }),
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        invalidatesTags: ['Decks'],
        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          const invalidateBy = decksService.util.selectInvalidatedBy(getState(), ['Decks'])

          try {
            const { data } = await queryFulfilled

            invalidateBy.forEach(({ originalArgs }) => {
              dispatch(
                decksService.util.updateQueryData('getDecks', originalArgs, draft => {
                  if (originalArgs.currentPage !== 1) {
                    return
                  }
                  draft.items.unshift(data)
                  draft.items.pop()
                })
              )
            })
          } catch (e) {
            console.log(e)
          }
        },
        query: args => {
          const formData = new FormData()

          formData.append('name', args.name)
          if (args.isPrivate) {
            formData.append('isPrivate', args.isPrivate.toString())
          }
          if (args.cover) {
            formData.append('cover', args.cover)
          } else if (args.cover === null) {
            formData.append('cover', '')
          }

          return {
            body: formData,
            method: 'POST',
            url: `v1/decks`,
          }
        },
      }),
      createFavoriteDeck: builder.mutation<void, CreateFavoriteArgs>({
        invalidatesTags: ['Decks'],
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/decks/${args.id}/favorite`,
        }),
      }),
      deleteDeck: builder.mutation<void, DeleteDeckArgs>({
        invalidatesTags: ['Decks'],
        async onQueryStarted({ id }, { dispatch, getState, queryFulfilled }) {
          const invalidateBy = decksService.util.selectInvalidatedBy(getState(), ['Decks'])

          const patchResults: any[] = []

          invalidateBy.forEach(({ originalArgs }) => {
            patchResults.push(
              dispatch(
                decksService.util.updateQueryData('getDecks', originalArgs, draft => {
                  const itemToDelete = draft.items.findIndex(deck => deck.id === id)

                  if (itemToDelete === -1) {
                    return
                  }
                  draft.items.splice(itemToDelete, 1)
                })
              )
            )
          })

          try {
            await queryFulfilled
          } catch (e) {
            patchResults.forEach(patchResult => {
              patchResult.undo()
            })
          }
        },
        query: args => ({
          body: args,
          method: 'DELETE',
          url: `v1/decks/${args.id}`,
        }),
      }),
      deleteFavoriteDeck: builder.mutation<void, DeleteFavoriteArgs>({
        invalidatesTags: ['Decks'],
        query: args => ({
          body: args,
          method: 'DELETE',
          url: `v1/decks/${args.id}/favorite`,
        }),
      }),
      getCardLearn: builder.query<Card, LearDeckArgs>({
        query: ({ id }) => `v1/decks/${id}/learn`,
      }),
      getDeck: builder.query<Deck, GetDeckArgs>({
        providesTags: ['Deck'],
        query: ({ id }) => `v1/decks/${id}`,
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
      updateDeck: builder.mutation<Deck, UpdateDeckArgs>({
        invalidatesTags: ['Decks', 'Deck'],
        async onQueryStarted({ id, ...args }, { dispatch, getState, queryFulfilled }) {
          const invalidateBy = decksService.util.selectInvalidatedBy(getState(), ['Decks'])

          const patchResults: any[] = []

          invalidateBy.forEach(({ originalArgs }) => {
            patchResults.push(
              dispatch(
                decksService.util.updateQueryData('getDecks', originalArgs, draft => {
                  const itemToUpdate = draft.items.findIndex(deck => deck.id === id)

                  if (itemToUpdate === -1) {
                    return
                  }
                  Object.assign(draft.items[itemToUpdate], args)
                })
              )
            )
          })

          try {
            await queryFulfilled
          } catch (e) {
            patchResults.forEach(patchResult => {
              patchResult.undo()
            })
          }
        },
        query: ({ id, ...args }) => {
          const formData = new FormData()

          if (args.name) {
            formData.append('name', args.name)
          }
          if (args.isPrivate) {
            formData.append('isPrivate', args.isPrivate.toString())
          }
          if (args.cover) {
            formData.append('cover', args.cover)
          } else if (args.cover === null) {
            formData.append('cover', '')
          }

          return {
            body: formData,
            method: 'PATCH',
            url: `v1/decks/${id}`,
          }
        },
      }),
    }
  },
})

export const {
  useAnswerCardMutation,
  useCreateDeckMutation,
  useCreateFavoriteDeckMutation,
  useDeleteDeckMutation,
  useDeleteFavoriteDeckMutation,
  useGetCardLearnQuery,
  useGetDeckQuery,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useUpdateDeckMutation,
} = decksService
