import { Link } from 'react-router-dom'

import Img from '@/assets/images/check-email/img.svg'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './check-email.module.scss'

type Props = {
  email: string
}

export const CheckEmail = ({ email }: Props) => {
  return (
    <Card className={s.Card}>
      <Typography as={'h1'} className={s.Title} variant={'h1'}>
        Check Email
      </Typography>
      <img alt={'img'} className={s.Img} src={Img} />
      <Typography as={'div'} className={s.Letter} variant={'body2'}>
        We’ve sent an Email with instructions to {email}
      </Typography>
      <Button as={Link} to={'/sign-in'}>
        Back to Sign In
      </Button>
    </Card>
  )
}
