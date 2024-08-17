import { Pagination } from '@/services/decks/decks.types'

export type GetCardsArgs = {
  answer?: string
  currentPage?: number
  id: string
  itemsPerPage?: number
  orderBy?: null | string
  question?: string
}

export type Card = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}

export type CardsListResponse = {
  items: Card[]
  pagination: Pagination
}