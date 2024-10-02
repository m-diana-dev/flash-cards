import { Card, CardsListResponse, CreateCardArgs, GetCardsArgs } from '@/services/cards/cards.types'
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

export const { useCreateCardMutation, useGetCardsQuery } = cardsService
