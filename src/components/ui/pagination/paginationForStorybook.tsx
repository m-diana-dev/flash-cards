import { useState } from 'react'

import { Pagination } from '@/components/ui/pagination/pagination'

type Props = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export const PaginationForStorybook = ({
  currentPage,
  itemsPerPage,
  totalItems,
  totalPages,
}: Props) => {
  const [currentPageState, setCurrentPage] = useState(currentPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <Pagination
      currentPage={currentPageState}
      handlePageChange={handlePageChange}
      itemsPerPage={itemsPerPage}
      totalItems={totalItems}
      totalPages={totalPages}
    />
  )
}
