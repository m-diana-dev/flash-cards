import {
  Card,
  CardsListResponse,
  CreateCardArgs,
  DeleteCardArgs,
  GetCardsArgs,
  UpdateCardArgs,
} from '@/services/cards/cards.types'
import { flashcardsApi } from '@/services/flashcards-api'

export const cardsService = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<Card, CreateCardArgs>({
        invalidatesTags: ['Cards', 'Deck'],
        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          const invalidateBy = cardsService.util.selectInvalidatedBy(getState(), ['Cards'])

          try {
            const { data } = await queryFulfilled

            invalidateBy.forEach(({ originalArgs }) => {
              dispatch(
                cardsService.util.updateQueryData('getCards', originalArgs, draft => {
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
        query: ({ deckId, ...args }) => {
          const formData = new FormData()

          formData.append('question', args.question)
          formData.append('answer', args.answer)
          if (args.questionImg) {
            formData.append('questionImg', args.questionImg)
          } else if (args.questionImg === null) {
            formData.append('questionImg', '')
          }
          if (args.answerImg) {
            formData.append('answerImg', args.answerImg)
          } else if (args.answerImg === null) {
            formData.append('answerImg', '')
          }

          return {
            body: formData,
            method: 'POST',
            url: `v1/decks/${deckId}/cards`,
          }
        },
      }),
      deleteCard: builder.mutation<void, DeleteCardArgs>({
        invalidatesTags: ['Deck'],
        async onQueryStarted({ id }, { dispatch, getState, queryFulfilled }) {
          const invalidateBy = cardsService.util.selectInvalidatedBy(getState(), ['Cards'])

          const patchResults: any[] = []

          invalidateBy.forEach(({ originalArgs }) => {
            patchResults.push(
              dispatch(
                cardsService.util.updateQueryData('getCards', originalArgs, draft => {
                  const itemToDelete = draft.items.findIndex(card => card.id === id)

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
          url: `v1/cards/${args.id}`,
        }),
      }),
      getCards: builder.query<CardsListResponse, GetCardsArgs>({
        providesTags: ['Cards'],

        query: ({ id, ...args }) => ({
          params: args,
          url: `v1/decks/${id}/cards`,
        }),
      }),
      updateCard: builder.mutation<Card, UpdateCardArgs>({
        invalidatesTags: ['Cards'],
        async onQueryStarted({ id, ...args }, { dispatch, getState, queryFulfilled }) {
          const invalidateBy = cardsService.util.selectInvalidatedBy(getState(), ['Cards'])

          const patchResults: any[] = []

          invalidateBy.forEach(({ originalArgs }) => {
            patchResults.push(
              dispatch(
                cardsService.util.updateQueryData('getCards', originalArgs, draft => {
                  const itemToUpdate = draft.items.findIndex(card => card.id === id)

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

          if (args.answer) {
            formData.append('answer', args.answer)
          }
          if (args.question) {
            formData.append('question', args.question)
          }
          if (args.answerImg) {
            formData.append('answerImg', args.answerImg)
          } else if (args.answerImg === null) {
            formData.append('answerImg', '')
          }
          if (args.questionImg) {
            formData.append('questionImg', args.questionImg)
          } else if (args.questionImg === null) {
            formData.append('questionImg', '')
          }

          return {
            body: formData,
            method: 'PATCH',
            url: `v1/cards/${id}`,
          }
        },
      }),
    }
  },
})

export const {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
  useUpdateCardMutation,
} = cardsService
