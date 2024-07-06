import { Button } from '@/components/ui/button'
import { Page } from '@/components/ui/page/page'
import { Pagination } from '@/components/ui/pagination'
import { Preloader } from '@/components/ui/preloader'
import { Typography } from '@/components/ui/typography'
import { DecksFilters } from '@/pages/decks-page/decks-filters/decks-filters'
import { DecksTable } from '@/pages/decks-page/decks-table/decks-table'
import { useGetDecksQuery } from '@/services/flashcards-api'

import s from './decks-page.module.scss'

import { useDecks } from './use-decks'

export function DecksPage() {
  const {
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
  } = useDecks()

  const authorId = show === 'my' ? 'f2be95b9-4d07-4751-a775-bd612fc9553a' : undefined

  const { data, error, isLoading } = useGetDecksQuery({
    authorId: authorId,
    maxCardsCount: +maxCount,
    minCardsCount: +minCount,
    name: search,
  })

  if (isLoading) {
    return <Preloader />
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>
  }

  return (
    <Page>
      <div className={s.PageTop}>
        <Typography as={'h1'} variant={'h1'}>
          Decks list
        </Typography>
        <Button>Add New Deck</Button>
      </div>
      <DecksFilters
        rangeValue={rangeValue}
        removeSearchParam={removeSearchParam}
        search={search}
        setCountParam={setCountParam}
        setRangeValue={setRangeValue}
        setSearchParam={setSearchParam}
        setShowParam={setShowParam}
        show={show}
      />
      <DecksTable decks={data?.items} />
      <Pagination
        currentPage={100}
        handlePageChange={() => {}}
        itemsPerPage={5}
        totalItems={1000}
        totalPages={100}
      />
    </Page>
  )
}
