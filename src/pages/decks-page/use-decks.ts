import { ChangeEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

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
  const maxCount = searchParams.get('maxCount') ?? '10'
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

  return {
    maxCount,
    minCount,
    rangeValue,
    removeSearchParam,
    search,
    setCountParam,
    setRangeValue,
    setSearchParam,
  }
}
