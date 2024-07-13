export interface DecksListResponse {
  items: Deck[]
  pagination: Pagination
}

export interface Pagination {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export interface Deck {
  author: Author
  cardsCount: number
  cover?: string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

export interface Author {
  id: string
  name: string
}

export interface GetDecksArgs {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: null | string
}

export interface MinMaxCardsCount {
  max: number
  min: number
}

export interface CreateDeckArgs {
  cover?: File | null
  isPrivate?: boolean
  name: string
}

export interface DeleteDeckArgs {
  id: string | undefined
}

export type UpdateDeckArgs = {
  id: string
} & Partial<CreateDeckArgs>
