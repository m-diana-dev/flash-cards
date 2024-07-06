import Delete from '@/assets/images/icons/Delete'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/input'
import { Page } from '@/components/ui/page/page'
import { Pagination } from '@/components/ui/pagination'
import { Slider } from '@/components/ui/slider'
import { Tabs } from '@/components/ui/tabs'
import { Typography } from '@/components/ui/typography'
import { DecksTable } from '@/pages/decks-page/decks-table/decks-table'
import { useGetDecksQuery, useGetMinMaxCardsQuery } from '@/services/flashcards-api'

import s from './decks-page.module.scss'

import { useDecks } from './use-decks'

export const DEFAULT_MAX_COUNT = '10'

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

  const { data: minMaxCountData } = useGetMinMaxCardsQuery()

  const handleSliderCommitted = (value: number[]) => {
    setCountParam([value[0], value[1]])
  }

  const handleCleanFilter = () => {
    setRangeValue([0, +DEFAULT_MAX_COUNT])
    setCountParam([0, 0])
    setShowParam('')
    removeSearchParam()
  }

  if (isLoading) {
    return <h1>Loading...</h1>
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
      <div className={s.PageFilters}>
        <TextField
          className={s.PageInput}
          onChange={setSearchParam}
          onReset={removeSearchParam}
          placeholder={'Search deck'}
          value={search}
          variant={'search'}
        />
        <div className={s.PageTabs}>
          <Typography as={'label'} className={s.PageFiltersLabel} variant={'body2'}>
            Show decks cards
          </Typography>
          <Tabs
            onValueChange={setShowParam}
            tabs={[
              { title: 'My Cards', value: 'my' },
              { title: 'All Cards', value: '' },
            ]}
            value={show}
          />
        </div>
        <div className={s.PageSlider}>
          <Typography as={'label'} className={s.PageFiltersLabel} variant={'body2'}>
            Number of cards
          </Typography>
          <Slider
            max={minMaxCountData?.max || 0}
            min={minMaxCountData?.min || 0}
            onValueChange={setRangeValue}
            onValueCommit={handleSliderCommitted}
            value={rangeValue}
          />
        </div>
        <Button onClick={handleCleanFilter} variant={'secondary'}>
          <Delete />
          Clear Filter
        </Button>
      </div>
      <DecksTable decks={data?.items} />
      <div>
        <Pagination
          currentPage={100}
          handlePageChange={() => {}}
          itemsPerPage={5}
          totalItems={1000}
          totalPages={100}
        />
      </div>
    </Page>
  )
}
