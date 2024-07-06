import { ComponentPropsWithoutRef } from 'react'

import { Typography } from '@/components/ui/typography'
import * as RadixTabs from '@radix-ui/react-tabs'

import s from './tabs.module.scss'

export type TabType = {
  disabled?: boolean
  title: string
  value: string
}

export type TabsProps = {
  defaultValue?: string
  tabs: TabType[]
} & ComponentPropsWithoutRef<typeof RadixTabs.Root>
export const Tabs = ({ tabs, ...rest }: TabsProps) => {
  return (
    <RadixTabs.Root className={s.TabsRoot} {...rest}>
      <RadixTabs.List className={s.TabsList}>
        {tabs.map((tab, index) => {
          return (
            <RadixTabs.Trigger
              className={s.TabsItem}
              disabled={tab.disabled}
              key={`${tab.value}-${index}`}
              value={tab.value}
            >
              <Typography as={'span'}>{tab.title}</Typography>
            </RadixTabs.Trigger>
          )
        })}
      </RadixTabs.List>
    </RadixTabs.Root>
  )
}
