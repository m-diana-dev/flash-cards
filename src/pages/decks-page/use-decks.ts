import { ChangeEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { DEFAULT_MAX_COUNT } from '@/pages/decks-page/decks-filters/decks-filters'

export const useDecks = () => {
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
  const maxCount = searchParams.get('maxCount') ?? DEFAULT_MAX_COUNT
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

  const [rangeValue, setRangeValue] = useState([+minCount, +maxCount])

  const show = searchParams.get('show') ?? ''
  const setShowParam = (value: string) => {
    if (value.length) {
      searchParams.set('show', value)
    } else {
      searchParams.delete('show')
    }
    setSearchParams(searchParams)
  }

  return {
    maxCount,
    minCount,
    rangeValue,
    removeSearchParam,
    search,
    setCountParam,
    setRangeValue,
    setSearchParam,
    setShowParam,
    show,
  }
}
