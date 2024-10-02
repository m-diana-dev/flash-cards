import { Button } from '@/components/ui/button'
import { Page } from '@/components/ui/page/page'
import { Pagination } from '@/components/ui/pagination'
import { Preloader } from '@/components/ui/preloader'
import { Typography } from '@/components/ui/typography'
import { AddDeckModal } from '@/pages/decks-page/add-deck-modal/add-deck-modal'
import { DecksFilters } from '@/pages/decks-page/decks-filters/decks-filters'
import { DecksTable } from '@/pages/decks-page/decks-table/decks-table'
import { useMeQuery } from '@/services/auth/auth.services'
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

  const { data: me } = useMeQuery()

  const authorId = show === 'my' ? me?.id : undefined
  const authorIdFavorited = show === 'favorite' ? me?.id : undefined

  const { currentData, data, error, isLoading } = useGetDecksQuery({
    authorId: authorId,
    currentPage: +currentPage,
    favoritedBy: authorIdFavorited,
    itemsPerPage: +itemsPerPage,
    maxCardsCount: +maxCount,
    minCardsCount: +minCount,
    name: search,
    orderBy: sorting,
  })

  const decks = currentData ?? data

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
      <DecksTable
        cleanFilter={cleanFilter}
        decks={decks?.items}
        setSorting={setSorting}
        sorting={sorting}
        userId={me?.id}
      />
      <Pagination
        changeItemsPerPage={handleItemPerPage}
        currentPage={+currentPage}
        handlePageChange={setCurrentPage}
        itemsPerPage={+itemsPerPage}
        totalItems={decks?.pagination.totalItems}
        totalPages={decks?.pagination.totalPages}
      />
    </Page>
  )
}
