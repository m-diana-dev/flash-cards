import { useState } from 'react'

import { Pagination } from '@/components/ui/pagination/pagination'

type Props = {
  itemsPerPage: number
  totalItems: number
}

export const PaginationForStorybook = ({ itemsPerPage, totalItems }: Props) => {
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <Pagination
      currentPage={currentPage}
      handlePageChange={handlePageChange}
      itemsPerPage={itemsPerPage}
      totalItems={totalItems}
    />
  )
}
