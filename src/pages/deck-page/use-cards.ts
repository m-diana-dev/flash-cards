import { useSearchParams } from 'react-router-dom'

export const useCards = () => {
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

  return {
    currentPage,
    itemsPerPage,
    removeSearchParam,
    search,
    setCurrentPage,
    setItemsPerPage,
    setSearchParam,
    setSorting,
    sorting,
  }
}
