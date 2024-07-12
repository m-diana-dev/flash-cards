import { useMemo } from 'react'

import ArrowLeft from '@/assets/images/icons/ArrowLeft'
import ArrowRight from '@/assets/images/icons/ArrowRight'
import { generatePagination } from '@/components/ui/pagination/generatePagination'
import { Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'

import s from './pagination.module.scss'

type Props = {
  changeItemsPerPage: (count: string) => void
  currentPage: number | undefined
  handlePageChange: (page: number) => void
  itemsPerPage: number
  totalItems: number | undefined
  totalPages: number | undefined
}

export const Pagination = ({
  changeItemsPerPage,
  currentPage = 1,
  handlePageChange,
  itemsPerPage,
  totalPages = 1,
}: Props) => {
  const { pages } = useMemo(() => {
    return generatePagination(currentPage, totalPages)
  }, [currentPage, totalPages])

  return (
    <div className={s.pagination}>
      <button
        className={s.navigationButton}
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <ArrowLeft />
      </button>
      {pages.map((page, index) =>
        typeof page === 'string' ? (
          <Typography
            as={'span'}
            className={s.paginationEllipsis}
            key={`${index}-${page}`}
            variant={'body2'}
          >
            {page}
          </Typography>
        ) : (
          typeof page === 'number' && (
            <Typography
              as={'button'}
              className={
                page === currentPage
                  ? `${s.paginationButton} ${s.activePageButton}`
                  : s.paginationButton
              }
              key={page}
              onClick={() => handlePageChange(page)}
              variant={'body2'}
            >
              {page}
            </Typography>
          )
        )
      )}
      <button
        className={s.navigationButton}
        disabled={currentPage === totalPages || currentPage > totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <ArrowRight />
      </button>
      <Typography as={'span'} variant={'body2'}>
        Показать
      </Typography>
      <Select
        className={s.paginationSelect}
        defaultValue={itemsPerPage.toString()}
        items={[
          { title: '5', value: '5' },
          { title: '10', value: '10' },
          { title: '20', value: '20' },
        ]}
        onValueChange={changeItemsPerPage}
        variant={'small'}
      />
      <Typography as={'span'} variant={'body2'}>
        на странице
      </Typography>
    </div>
  )
}
