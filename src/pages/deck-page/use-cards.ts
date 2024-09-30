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

  return {
    removeSearchParam,
    search,
    setSearchParam,
  }
}
