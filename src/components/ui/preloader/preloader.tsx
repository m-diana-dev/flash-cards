import Loader from '@/assets/images/icons/Loader'

import s from './preloader.module.scss'

export const Preloader = () => {
  return (
    <div className={s.Preloader}>
      <Loader />
    </div>
  )
}
