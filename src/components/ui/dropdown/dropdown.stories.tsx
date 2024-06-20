import type { Meta, StoryObj } from '@storybook/react'

import { Link } from 'react-router-dom'

import Delete from '@/assets/images/icons/Delete'
import Edit from '@/assets/images/icons/Edit'
import Kebab from '@/assets/images/icons/Kebab'
import Logout from '@/assets/images/icons/Logout'
import Persone from '@/assets/images/icons/Persone'
import Play from '@/assets/images/icons/Play'
import Avatar from '@/assets/images/profile/avatar.png'
import { DropdownDesc } from '@/components/ui/dropdown/dropdownDesc/dropdownDesc'
import { DropdownItem } from '@/components/ui/dropdown/dropdownItem/dropdownItem'
import { DropdownTrigger } from '@/components/ui/dropdown/dropdownTrigger/dropdownTrigger'
import { withRouter } from 'storybook-addon-remix-react-router'

import { Dropdown } from './'

const meta = {
  component: Dropdown,
  decorators: [withRouter],
  tags: ['autodocs'],
  title: 'Components/Dropdown',
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const DropdownHeader: Story = {
  args: {
    children: (
      <>
        <DropdownDesc avatar={Avatar} email={'j&johnson@gmail.com'} name={'Ivan'} />
        <DropdownItem as={Link} icon={<Persone />} title={'My Profile'} to={'/'} />
        <DropdownItem icon={<Logout />} title={'Sign Out'} />
      </>
    ),
    trigger: (
      <DropdownTrigger>
        <img alt={'Avatar'} src={Avatar} />
      </DropdownTrigger>
    ),
  },
}

export const DropdownMyDeck: Story = {
  args: {
    children: (
      <>
        <DropdownItem icon={<Play />} title={'Learn'} />
        <DropdownItem icon={<Edit />} title={'Edit'} />
        <DropdownItem icon={<Delete />} title={'Delete'} />
      </>
    ),
    trigger: (
      <DropdownTrigger>
        <Kebab height={24} width={24} />
      </DropdownTrigger>
    ),
  },
}
