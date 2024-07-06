import { ChangeEvent } from 'react'

import Delete from '@/assets/images/icons/Delete'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Tabs } from '@/components/ui/tabs'
import { Typography } from '@/components/ui/typography'
import { useGetMinMaxCardsQuery } from '@/services/flashcards-api'

import s from './decks-filters.module.scss'

export const DEFAULT_MAX_COUNT = '10'

type Props = {
  rangeValue: number[]
  removeSearchParam: () => void
  search: string
  setCountParam: (count: number[]) => void
  setCurrentPage: (value: null | number) => void
  setRangeValue: (value: number[]) => void
  setSearchParam: (value: string) => void
  setShowParam: (value: string) => void
  show: string
}

export const DecksFilters = ({
  rangeValue,
  removeSearchParam,
  search,
  setCountParam,
  setCurrentPage,
  setRangeValue,
  setSearchParam,
  setShowParam,
  show,
}: Props) => {
  const { data: minMaxCountData } = useGetMinMaxCardsQuery()

  const handleSliderCommitted = (value: number[]) => {
    setCountParam([value[0], value[1]])
    setCurrentPage(0)
  }

  const handleCleanFilter = () => {
    setRangeValue([0, +DEFAULT_MAX_COUNT])
    setCountParam([0, 0])
    setShowParam('')
    setCurrentPage(null)
    removeSearchParam()
  }

  const handleChangeTabs = (value: string) => {
    setShowParam(value)
    setCurrentPage(null)
  }

  const handleTextField = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.currentTarget.value)
    setCurrentPage(null)
  }

  const handleResetTextField = () => {
    removeSearchParam()
    setCurrentPage(null)
  }

  return (
    <div className={s.PageFilters}>
      <TextField
        className={s.PageInput}
        onChange={handleTextField}
        onReset={handleResetTextField}
        placeholder={'Search deck'}
        value={search}
        variant={'search'}
      />
      <div className={s.PageTabs}>
        <Typography as={'label'} className={s.PageFiltersLabel} variant={'body2'}>
          Show decks cards
        </Typography>
        <Tabs
          onValueChange={handleChangeTabs}
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
  )
}
