import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { DEFAULT_MAX_COUNT } from '@/pages/decks-page/decks-filters/decks-filters'

export const useDecks = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') ?? ''
  const setSearchParam = (value: string) => {
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

  const itemsPerPage = searchParams.get('itemsPerPage') ?? '5'
  const setItemsPerPage = (value: string) => {
    if (value) {
      searchParams.set('itemsPerPage', value)
    } else {
      searchParams.delete('itemsPerPage')
    }
    setSearchParams(searchParams)
  }

  const currentPage = searchParams.get('currentPage') ?? '1'
  const setCurrentPage = (value: null | number) => {
    if (value) {
      searchParams.set('currentPage', value.toString())
    } else {
      searchParams.delete('currentPage')
    }
    setSearchParams(searchParams)
  }

  const sorting = searchParams.get('sorting') ?? null
  const setSorting = (value: null | string) => {
    if (value) {
      searchParams.set('sorting', value)
    } else {
      searchParams.delete('sorting')
    }
    setSearchParams(searchParams)
  }

  const cleanFilter = () => {
    setRangeValue([0, +DEFAULT_MAX_COUNT])
    setCountParam([0, 0])
    setShowParam('')
    setCurrentPage(null)
    removeSearchParam()
    setSorting(null)
  }

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  return {
    cleanFilter,
    currentPage,
    isOpenModal,
    itemsPerPage,
    maxCount,
    minCount,
    rangeValue,
    removeSearchParam,
    search,
    setCountParam,
    setCurrentPage,
    setIsOpenModal,
    setItemsPerPage,
    setRangeValue,
    setSearchParam,
    setShowParam,
    setSorting,
    show,
    sorting,
  }
}
