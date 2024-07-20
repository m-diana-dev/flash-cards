import { useNavigate } from 'react-router-dom'

import ArrowBack from '@/assets/images/icons/ArrowBack'
import { PersonalInformation } from '@/components/profile/persolan-information/personal-information'
import { Button } from '@/components/ui/button'
import { Preloader } from '@/components/ui/preloader'
import { useLogoutMutation, useMeQuery, useUserUpdateMutation } from '@/services/auth/auth.services'

import s from './profile-page.module.scss'

export const ProfilePage = () => {
  const { data, error, isLoading } = useMeQuery()
  const [updateUser] = useUserUpdateMutation()
  const [logout] = useLogoutMutation()

  const navigate = useNavigate()

  if (isLoading) {
    return <Preloader />
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>
  }

  return (
    <div className={s.Page}>
      <Button className={s.PageButton} onClick={() => navigate(-1)} variant={'link'}>
        <ArrowBack />
        Back to Previous Page
      </Button>
      <PersonalInformation
        email={data?.email || ''}
        img={data?.avatar || ''}
        logout={logout}
        name={data?.name || ''}
        updateUserHandler={updateUser}
      />
    </div>
  )
}
