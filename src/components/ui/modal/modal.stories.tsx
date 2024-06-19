import type { Meta, StoryObj } from '@storybook/react'

import { ModalFooter } from '@/components/ui/modal/modalFooter/modalFooter'
import { ModalMain } from '@/components/ui/modal/modalMain/modalMain'
import { ModalTitle } from '@/components/ui/modal/modalTitle/modalTitle'

import { Modal } from './'

const meta = {
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/Modal',
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const ModalFull: Story = {
  args: {
    buttonTriggerTitle: 'Add New Deck',
    children: (
      <>
        <ModalTitle title={'Add New Deck'} />
        <ModalMain>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniamdsa
        </ModalMain>
        <ModalFooter buttonTitle={'Add New Pack'} />
      </>
    ),
  },
}

export const ModalWithTitleOnly: Story = {
  args: {
    buttonTriggerTitle: 'Add New Deck',
    children: <ModalTitle title={'Add New Deck'} />,
  },
}

export const ModalWithMainOnly: Story = {
  args: {
    buttonTriggerTitle: 'Add New Deck',
    children: (
      <ModalMain>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniamdsa
      </ModalMain>
    ),
  },
}

export const ModalWithFooterOnly: Story = {
  args: {
    buttonTriggerTitle: 'Add New Deck',
    children: <ModalFooter buttonTitle={'Add New Pack'} />,
  },
}
