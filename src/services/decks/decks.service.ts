import {
  CreateDeckArgs,
  Deck,
  DecksListResponse,
  DeleteDeckArgs,
  GetDecksArgs,
  MinMaxCardsCount,
  UpdateDeckArgs,
} from '@/services/decks/decks.types'
import { flashcardsApi } from '@/services/flashcards-api'

export const decksService = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
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
      deleteDeck: builder.mutation<void, DeleteDeckArgs>({
        invalidatesTags: ['Decks'],
        query: args => ({
          body: args,
          method: 'DELETE',
          url: `v1/decks/${args.id}`,
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
      updateDeck: builder.mutation<Deck, UpdateDeckArgs>({
        invalidatesTags: ['Decks'],
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
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useUpdateDeckMutation,
} = decksService
