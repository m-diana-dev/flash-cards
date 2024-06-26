import Delete from '@/assets/images/icons/Delete'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/input'
import { Page } from '@/components/ui/page/page'
import { SliderApp } from '@/components/ui/slider'
import { Typography } from '@/components/ui/typography'
import { DecksTable } from '@/pages/decks-page/decks-table/decks-table'
import { useGetDecksQuery } from '@/services/flashcards-api'

import s from './decks-page.module.scss'

import { useDecks } from './use-decks'

export function DecksPage() {
  const { maxCount, minCount, removeSearchParam, search, setCountParam, setSearchParam } =
    useDecks()

  const { data, error, isLoading } = useGetDecksQuery({
    maxCardsCount: +maxCount,
    minCardsCount: +minCount,
    name: search,
  })

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
        </div>
        <div className={s.PageSlider}>
          <Typography as={'label'} className={s.PageFiltersLabel} variant={'body2'}>
            Number of cards
          </Typography>
          <SliderApp max={+maxCount} setValue={setCountParam} value={[+minCount, +maxCount]} />
        </div>
        <Button variant={'secondary'}>
          <Delete />
          Clear Filter
        </Button>
      </div>
      <DecksTable decks={data?.items} />
    </Page>
  )
}
