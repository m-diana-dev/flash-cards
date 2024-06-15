import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './tables.module.scss'

type TableProps = ComponentPropsWithoutRef<'table'>

export const Table = forwardRef<ElementRef<'table'>, TableProps>(({ className, ...rest }, ref) => {
  const computedClass = clsx(s.table, className)

  return <table className={computedClass} {...rest} ref={ref} />
})

type TableHeaderProps = ComponentPropsWithoutRef<'thead'>

export const TableHeader = forwardRef<ElementRef<'thead'>, TableHeaderProps>(
  ({ className, ...rest }, ref) => {
    const computedClass = clsx(s.thead, className)

    return <thead className={computedClass} {...rest} ref={ref} />
  }
)

type TableRowProps = ComponentPropsWithoutRef<'tr'>

export const TableRow = forwardRef<ElementRef<'tr'>, TableRowProps>(
  ({ className, ...rest }, ref) => {
    const computedClass = clsx(className)

    return <tr className={computedClass} {...rest} ref={ref} />
  }
)
type TableHeadCellProps = ComponentPropsWithoutRef<'th'>
export const TableHeadCell = forwardRef<ElementRef<'th'>, TableHeadCellProps>(
  ({ className, ...rest }, ref) => {
    const computedClass = clsx(s.th, className)

    return <th className={computedClass} {...rest} ref={ref} />
  }
)

type TableDataCellProps = ComponentPropsWithoutRef<'td'>
export const TableDataCell = forwardRef<ElementRef<'td'>, TableDataCellProps>(
  ({ className, ...rest }, ref) => {
    const computedClass = clsx(s.td, className)

    return <td className={computedClass} {...rest} ref={ref} />
  }
)

type TableBodyProps = ComponentPropsWithoutRef<'tbody'>
export const TableBody = forwardRef<ElementRef<'tbody'>, TableBodyProps>(
  ({ className, ...rest }, ref) => {
    const computedClass = clsx(className)

    return <tbody className={computedClass} {...rest} ref={ref} />
  }
)
