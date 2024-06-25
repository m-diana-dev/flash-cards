import { ChangeEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import ArrowTop from '@/assets/images/icons/ArrowTop'
import Delete from '@/assets/images/icons/Delete'
import Edit from '@/assets/images/icons/Edit'
import Play from '@/assets/images/icons/Play'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/input'
import { Page } from '@/components/ui/page/page'
import { SliderApp } from '@/components/ui/slider'
import {
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { useGetDecksQuery } from '@/services/flashcards-api'

import s from './decks-page.module.scss'

export function DecksPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
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

  const [countCards, setCountCards] = useState<number[]>([0, 10])

  const { data, error, isLoading } = useGetDecksQuery({
    maxCardsCount: countCards[1],
    minCardsCount: countCards[0],
    name: search,
  })

  if (isLoading) {
    return <h1>Loading...</h1> // Здесь можете добавить спиннер на ваш вкус
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
          onChange={handleSearch}
          onReset={removeSearchParam}
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
          <SliderApp setValue={setCountCards} value={countCards} />
        </div>
        <Button variant={'secondary'}>
          <Delete />
          Clear Filter
        </Button>
      </div>
      <Table className={s.PageTable}>
        <TableHeader>
          <TableRow>
            <TableHeadCell className={s.PageTableCell}>Name</TableHeadCell>
            <TableHeadCell className={s.PageTableCell}>Cards</TableHeadCell>
            <TableHeadCell className={s.PageTableCell}>
              Last Updated
              <ArrowTop height={10} width={8} />
            </TableHeadCell>
            <TableHeadCell className={s.PageTableCell}>Created By</TableHeadCell>
            <TableHeadCell className={s.PageTableCell}></TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items.map(deck => {
            const updatedAt = new Date(deck.updated).toLocaleDateString('ru-RU')

            return (
              <TableRow key={deck.id}>
                <TableCell className={s.PageTableCell}>{deck.name}</TableCell>
                <TableCell className={s.PageTableCell}>{deck.cardsCount}</TableCell>
                <TableCell className={s.PageTableCell}>{updatedAt}</TableCell>
                <TableCell className={s.PageTableCell}>{deck.author.name}</TableCell>
                <TableCell className={s.PageTableCell}>
                  <button>
                    <Play />
                  </button>
                  <button>
                    <Edit />
                  </button>
                  <button>
                    <Delete />
                  </button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Page>
  )
}
