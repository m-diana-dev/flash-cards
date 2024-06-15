import { ReactNode } from 'react'

import { Typography } from '@/components/ui/typography'
import * as RadixTabs from '@radix-ui/react-tabs'

import s from './tabs.module.scss'

export type TabType = {
  content: ReactNode
  disabled?: boolean
  title: string
  value: string
}

export type TabsProps = {
  defaultValue?: string
  tabs: TabType[]
}

export const Tabs = ({ defaultValue, tabs }: TabsProps) => {
  return (
    <RadixTabs.Root className={s.TabsRoot} defaultValue={defaultValue || tabs[0].value}>
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
      {tabs.map((tab, index) => {
        return (
          <RadixTabs.Content
            className={s.TabsItemContent}
            key={`${tab.value}-${index}`}
            value={tab.value}
          >
            {tab.content}
          </RadixTabs.Content>
        )
      })}
    </RadixTabs.Root>
  )
}
