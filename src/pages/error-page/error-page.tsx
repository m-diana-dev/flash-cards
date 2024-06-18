import { Link } from 'react-router-dom'

import Error404 from '@/assets/images/404/404.svg'
import { Button } from '@/components/ui/button'
import { Page } from '@/components/ui/page/page'
import { Typography } from '@/components/ui/typography'

import s from './error-page.module.scss'

export const ErrorPage = () => {
  return (
    <Page className={s.ErrorPage}>
      <img alt={'404'} className={s.ErrorPageImg} src={Error404} />
      <Typography className={s.ErrorPageText}>Sorry! Page not found!</Typography>
      <Button as={Link} to={'/'}>
        Back to home page
      </Button>
    </Page>
  )
}
