import { Button } from '@/components/ui/button'
import { Page } from '@/components/ui/page/page'
import { Pagination } from '@/components/ui/pagination'
import { Preloader } from '@/components/ui/preloader'
import { Typography } from '@/components/ui/typography'
import { AddDeckModal } from '@/pages/decks-page/add-deck-modal/add-deck-modal'
import { DecksFilters } from '@/pages/decks-page/decks-filters/decks-filters'
import { DecksTable } from '@/pages/decks-page/decks-table/decks-table'
import { useGetDecksQuery } from '@/services/decks/decks.service'

import s from './decks-page.module.scss'

import { useDecks } from './use-decks'

export function DecksPage() {
  const {
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
  } = useDecks()

  const authorId = show === 'my' ? 'f2be95b9-4d07-4751-a775-bd612fc9553a' : undefined

  const { data, error, isLoading } = useGetDecksQuery({
    authorId: authorId,
    currentPage: +currentPage,
    itemsPerPage: +itemsPerPage,
    maxCardsCount: +maxCount,
    minCardsCount: +minCount,
    name: search,
    orderBy: sorting,
  })

  const handleItemPerPage = (count: string) => {
    setItemsPerPage(count)
    setCurrentPage(null)
  }

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
        <Button onClick={() => setIsOpenModal(true)}>Add New Deck</Button>
        <AddDeckModal cleanFilter={cleanFilter} onOpenChange={setIsOpenModal} open={isOpenModal} />
      </div>
      <DecksFilters
        cleanFilter={cleanFilter}
        rangeValue={rangeValue}
        removeSearchParam={removeSearchParam}
        search={search}
        setCountParam={setCountParam}
        setCurrentPage={setCurrentPage}
        setRangeValue={setRangeValue}
        setSearchParam={setSearchParam}
        setShowParam={setShowParam}
        show={show}
      />
      <DecksTable decks={data?.items} setSorting={setSorting} sorting={sorting} />
      <Pagination
        changeItemsPerPage={handleItemPerPage}
        currentPage={+currentPage}
        handlePageChange={setCurrentPage}
        itemsPerPage={+itemsPerPage}
        totalItems={data?.pagination.totalItems}
        totalPages={data?.pagination.totalPages}
      />
    </Page>
  )
}
