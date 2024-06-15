import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Page } from '@/components/ui/page/page'
import { Typography } from '@/components/ui/typography'
import Error404 from '@/images/404/404.svg'

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
