import { ChangeEvent } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useGetMinMaxCardsQuery } from '@/services/flashcards-api'

export const useDecks = () => {
  const { data } = useGetMinMaxCardsQuery({})
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') ?? ''
  const setSearchParam = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value

    if (value.length) {
      searchParams.set('search', value)
    } else {
      searchParams.delete('search')
    }
    setSearchParams(searchParams)
  }
  const removeSearchParam = () => {
    searchParams.delete('search')
    setSearchParams(searchParams)
  }

  const minCount = searchParams.get('minCount') ?? ''
  const maxCount = searchParams.get('maxCount') ?? data?.max
  const setCountParam = (value: number[]) => {
    const minCount = value[0]
    const maxCount = value[1]

    if (minCount) {
      searchParams.set('minCount', minCount.toString())
    } else {
      searchParams.delete('minCount')
    }

    if (maxCount) {
      searchParams.set('maxCount', maxCount.toString())
    } else {
      searchParams.delete('maxCount')
    }
    setSearchParams(searchParams)
  }

  return {
    maxCount,
    minCount,
    removeSearchParam,
    search,
    setCountParam,
    setSearchParam,
  }
}
