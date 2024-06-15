import { ChangeEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/input'
import { Page } from '@/components/ui/page/page'
import { SliderApp } from '@/components/ui/slider'
import { Tabs } from '@/components/ui/tabs'
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
        <TextField onChange={handleSearch} value={search} />
        <Tabs
          tabs={[
            {
              title: 'My Cards',
              value: 'My Cards',
            },
            {
              title: 'All Cards',
              value: 'All Cards',
            },
          ]}
        />
        <SliderApp setValue={setCountCards} value={countCards} />
        <Button variant={'secondary'}>Clear Filter</Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cards</th>
            <th>Last Updated</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {data?.items.map(deck => {
            const updatedAt = new Date(deck.updated).toLocaleDateString('ru-RU')

            return (
              <tr key={deck.id}>
                <td>{deck.name}</td>
                <td>{deck.cardsCount}</td>
                <td>{updatedAt}</td>
                <td>{deck.author.name}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Page>
  )
}
