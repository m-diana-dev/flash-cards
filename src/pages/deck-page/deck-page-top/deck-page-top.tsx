import { Link } from 'react-router-dom'

import Delete from '@/assets/images/icons/Delete'
import Edit from '@/assets/images/icons/Edit'
import Kebab from '@/assets/images/icons/Kebab'
import Play from '@/assets/images/icons/Play'
import { Button } from '@/components/ui/button'
import { Dropdown } from '@/components/ui/dropdown'
import { DropdownItem } from '@/components/ui/dropdown/dropdownItem/dropdownItem'
import { DropdownTrigger } from '@/components/ui/dropdown/dropdownTrigger/dropdownTrigger'
import { TextField } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'
import { Deck } from '@/services/decks/decks.types'

import s from './deck-page-top.module.scss'

type Props = {
  deck: Deck | undefined
  emptyPack: boolean
  myPack: boolean
  setOpenDeleteModal: (open: boolean) => void
  setOpenUpdateModal: (open: boolean) => void
}
export const DeckPageTop = ({
  deck,
  emptyPack,
  myPack,
  setOpenDeleteModal,
  setOpenUpdateModal,
}: Props) => {
  return (
    <>
      <div className={s.DeckPageTop}>
        <div className={s.DeckPageTopWrapp}>
          <Typography as={'h1'} className={s.DeckPageName} variant={'h1'}>
            {deck?.name}
          </Typography>
          {myPack && (
            <Dropdown
              trigger={
                <DropdownTrigger>
                  <Kebab height={20} width={20} />
                </DropdownTrigger>
              }
            >
              {!emptyPack && (
                <DropdownItem
                  as={Link}
                  icon={<Play />}
                  title={'Learn'}
                  to={`/decks/${deck?.id}/learn`}
                />
              )}

              <DropdownItem
                icon={<Edit />}
                onClick={() => setOpenUpdateModal(true)}
                title={'Edit'}
              />
              <DropdownItem
                icon={<Delete />}
                onClick={() => setOpenDeleteModal(true)}
                title={'Delete'}
              />
            </Dropdown>
          )}
        </div>
        {myPack
          ? !emptyPack && <Button>Add New Card</Button>
          : !emptyPack && (
              <Button as={Link} to={`/decks/${deck?.id}/learn`}>
                Learn to Pack
              </Button>
            )}
      </div>
      {deck?.cover && <img alt={'cover'} className={s.DeckPageCover} src={deck?.cover} />}
      {!emptyPack && <TextField className={s.DeckPageSearch} variant={'search'} />}
    </>
  )
}
